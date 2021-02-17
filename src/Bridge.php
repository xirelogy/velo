<?php

namespace Xirelogy\Velo;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\Html\Renderer;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

abstract class Bridge
{
    /**
     * Render head CSS contents
     * @return string
     */
    public function renderHeadCss() : string
    {
        $ret = '';
        foreach ($this->getStyles() as $style) {
            $ret .= $style->render() . "\n";
        }

        return $ret;
    }


    /**
     * Render the script
     */
    public function renderScript() : string
    {
        $scripts = [];

        $scripts[] = 'window.$velo = \'' . $this->getJsName() . '\';';

        $script = new ElementDefinition('script', [], $scripts);

        return Renderer::finalize($script);
    }


    /**
     * Get the Javascript definition name
     * @return string
     */
    protected abstract function getJsName() : string;


    /**
     * Get all styles
     * @return iterable<ElementDefinition>
     */
    protected abstract function getStyles() : iterable;


    /**
     * Perform simple rendering (if applicable)
     * @param string $className Component class name
     * @param RenderContext $context Context of the rendering
     * @return ElementDefinition|string|null
     */
    public function renderSimpleComponent(string $className, RenderContext $context)
    {
        return null;
    }


    /**
     * Get extra classes to be added to the component's main HTML tag during rendering
     * @param string $className Component class name
     * @return string[]
     */
    public function getExtraClasses(string $className) : array
    {
        return [];
    }


    /**
     * Get a specific renderer for given component
     * @param string $className Component class name
     * @return ComponentRenderer|null Specific renderer, if exist
     */
    public abstract function getComponentRenderer(string $className) : ?ComponentRenderer;
}