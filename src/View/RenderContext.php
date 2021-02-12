<?php

namespace Xirelogy\Velo\View;

use phpDocumentor\Reflection\Element;
use Xirelogy\Velo\Html\ElementDefinition;

abstract class RenderContext
{
    /**
     * @var mixed
     * The associated state
     */
    private $state;


    /**
     * RenderContext constructor.
     */
    protected function __construct()
    {
        $this->state = null;
    }


    /**
     * Set associated state
     * @param mixed|null $state
     */
    public function setState($state) : void
    {
        $this->state = $state;
    }


    /**
     * Get associated state
     * @return mixed|null
     */
    public function getState()
    {
        return $this->state;
    }


    /**
     * If a normal (pass-through) attribute exist
     * @param string $key Key of the attribute
     * @return bool
     */
    public function hasNormalAttribute(string $key) : bool
    {
        return $this->hasAttribute($key, true);
    }


    /**
     * If an extracted (non pass-through) attribute exist
     * @param string $key Key of the attribute
     * @return bool
     */
    public function hasExtractedAttribute(string $key) : bool
    {
        return $this->hasAttribute($key, false);
    }


    /**
     * Check if an attribute exist
     * @param string $key Key of the attribute
     * @param bool $isNormal If the attribute is normal (pass through) or extracted
     * @return bool
     */
    protected abstract function hasAttribute(string $key, bool $isNormal) : bool;


    /**
     * Get normal (pass-through) attribute's value
     * @param string $key Key of the attribute
     * @param mixed|null $default Default value, if attribute does not exist
     */
    public function getNormalAttribute(string $key, $default = null)
    {
        $value = $this->getAttribute($key, true);
        return !is_null($value) ? $value : $default;
    }


    /**
     * Get extracted (non pass-through) attribute's value
     * @param string $key Key of the attribute
     * @param mixed|null $default Default value, if attribute does not exist
     */
    public function getExtractedAttribute(string $key, $default = null)
    {
        $value = $this->getAttribute($key, false);
        return !is_null($value) ? $value : $default;
    }


    /**
     * Get attribute's value, returning null if the attribute is not found
     * @param string $key Key of the attribute
     * @param bool $isNormal If the attribute is normal (pass through) or extracted
     * @return mixed|null
     */
    protected abstract function getAttribute(string $key, bool $isNormal);


    /**
     * Export a slot's payload to content target
     * @param array $contents Content target to be exported to
     * @param string|null $name Name of the slot, or the default slot if not specified
     * @param callable|null $conversion Conversion to be applied to the slot content, if specified
     */
    public function exportSlot(array &$contents, ?string $name = null, ?callable $conversion = null) : void
    {
        $slot = $this->getSlot($name);
        if (is_null($slot)) return;

        if (!is_null($conversion)) $slot = $conversion($slot);
        $contents[] = $slot;
    }


    /**
     * Get a slot's content
     * @param string|null $name Name of the slot, or the default slot if not specified
     * @param mixed|null $default Default to be returned, if slot is not found
     * @return mixed|null
     */
    public function getSlot(?string $name = null, $default = null)
    {
        return $default;
    }


    /**
     * Add an attribute to the main attributes for output
     * @param string $key Attribute key
     * @param string $value Attribute value
     */
    public abstract function addAttribute(string $key, string $value) : void;


    /**
     * Add a class name value to the main class for output
     * @param string|null $className
     */
    public abstract function addClass(?string $className) : void;


    /**
     * Finalize the attributes for output
     * @return array
     */
    public abstract function finalizeAttributes() : array;


    /**
     * Simply wrap and render the element
     * @param string|null $tag HTML tag name to be used (or null if no HTML tag)
     * @param array $addClassNames Additional classes
     * @return ElementDefinition|array|null
     */
    public abstract function simpleWrap(?string $tag, array $addClassNames = []);
}