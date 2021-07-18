<?php

namespace Xirelogy\Velo\View;

use Exception;
use Illuminate\View\Component as BaseComponent;
use Illuminate\View\ComponentAttributeBag;
use Xirelogy\Velo\BridgeFactory;
use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\Html\Renderer;
use Xirelogy\Velo\Utils\Strings;

abstract class Component extends BaseComponent
{
    /**
     * @inheritDoc
     */
    public function render()
    {
        return function(array $data) {

            // Create a new context
            $context = new class($data) extends RenderContext
            {
                /**
                 * @var array
                 * The data passed around for rendering
                 */
                private $data;

                /**
                 * @var ComponentAttributeBag
                 * Input component attributes
                 */
                private $attributes;

                /**
                 * @var array<string, string>
                 * Additional attributes for output
                 */
                private $outAttributes;

                /**
                 * Attributes that are prevented (blocked) from output
                 * @var array<string, mixed>
                 */
                private $blockAttributes;

                /**
                 * @var ClassNames
                 * Class names that will be used for output
                 */
                private $classes;


                /**
                 * anonymous RenderContext's constructor.
                 * @param array $data
                 */
                public function __construct(array $data)
                {
                    parent::__construct();

                    $this->data = $data;
                    $this->attributes = $data['attributes'] ?? new ComponentAttributeBag();
                    $this->outAttributes = [];
                    $this->blockAttributes = [];
                    $this->classes = new ClassNames(self::parseClassAttributes($data));
                }


                /**
                 * @inheritDoc
                 */
                protected function hasAttribute(string $key, bool $isNormal) : bool
                {
                    $value = $this->attributes->get($key);
                    if (is_null($value)) return false;

                    if (!$isNormal) $this->blockAttributes[$key] = $key;
                    return true;
                }


                /**
                 * @inheritDoc
                 */
                protected function getAttribute(string $key, bool $isNormal)
                {
                    if ($key == 'class') return $this->classes; // Specialization

                    $value = $this->attributes->get($key);
                    if (is_null($value)) return null;

                    if (!$isNormal) $this->blockAttributes[$key] = $key;
                    return $value;
                }


                /**
                 * @inheritDoc
                 */
                public function getSlot(?string $name = null, $default = null)
                {
                    if (is_null($name)) $name = 'slot';

                    if (!array_key_exists($name, $this->data)) return $default;
                    return $this->data[$name];
                }


                /**
                 * @inheritDoc
                 */
                public function addAttribute(string $key, string $value) : void
                {
                    $this->outAttributes[$key] = $value;
                }


                /**
                 * @inheritDoc
                 */
                public function addClass(?string $className) : void
                {
                    $this->classes->add($className);
                }


                /**
                 * @inheritDoc
                 */
                public function finalizeAttributes() : array
                {
                    $ret = [];

                    foreach ($this->attributes as $key => $value) {
                        if ($key === 'class') continue;
                        if (array_key_exists($key, $this->outAttributes)) continue;
                        if (array_key_exists($key, $this->blockAttributes))continue;
                        $ret[$key] = $value;
                    }

                    foreach ($this->outAttributes as $key => $value) {
                        $ret[$key] = $value;
                    }

                    $ret['class'] = $this->classes;
                    return $ret;
                }


                /**
                 * @inheritDoc
                 */
                public function simpleWrap(?string $tag, array $addClassNames = [])
                {
                    $contents = [];
                    $this->exportSlot($contents);

                    if (is_null($tag)) return $contents;

                    foreach ($addClassNames as $addClassName) {
                        $this->addClass($addClassName);
                    }

                    return new ElementDefinition($tag, $this->finalizeAttributes(), $contents);
                }


                /**
                 * Parse for class attributes from given data
                 * @param array $data
                 * @return string[]
                 */
                private static function parseClassAttributes(array $data) : array
                {
                    $attributes = $data['attributes'] ?? null;
                    if (is_null($attributes)) return [];

                    $classes = $attributes['class'] ?? null;
                    if (is_null( Strings::nonEmptyString($classes) )) return [];

                    $ret = [];
                    $classes = explode(' ', $classes);
                    foreach ($classes as $class) {
                        $class = Strings::nonEmptyString($class);
                        if (is_null($class)) continue;
                        $ret[] = $class;
                    }

                    return $ret;
                }
            };

            // Actual rendering
            $this->onBeforeCallRender($context);
            $ret = $this->onCallRender($context);
            return Renderer::finalize($ret);
        };
    }


    /**
     * Notification before rendering
     * @param RenderContext $context
     */
    protected function onBeforeCallRender(RenderContext $context) : void
    {

    }


    /**
     * Call and handle rendering in context
     * @param RenderContext $context Context of the rendering
     * @return ElementDefinition|string|null
     * @throws Exception
     */
    private function onCallRender(RenderContext $context)
    {
        $bridge = BridgeFactory::getCurrentInstance();
        $className = static::class;

        // Try to do simple rendering
        $simpleResult = $bridge->renderSimpleComponent($className, $context);
        if (!is_null($simpleResult)) return $simpleResult;

        // Add extra classes here
        $extraClasses = $bridge->getExtraClasses($className);
        foreach ($extraClasses as $extraClass) {
            $context->addClass($extraClass);
        }

        // Use a specific component renderer, if provided
        $renderer = $bridge->getComponentRenderer($className);
        if (!is_null($renderer)) {
            return $renderer->render($context);
        }

        // Otherwise use the default rendering
        return $this->onRender($context);
    }


    /**
     * Render the current component
     * @param RenderContext $context Context of the rendering
     * @return ElementDefinition|string|null Rendering result
     * @throws Exception
     */
    protected abstract function onRender(RenderContext $context);
}