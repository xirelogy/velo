<?php

namespace Xirelogy\Velo\Html;

use Xirelogy\Velo\Utils\Strings;

/**
 * Class ClassNames
 * @package Xirelogy\Velo\Html
 *
 * A collection of class names applicable for the HTML class attribute
 */
class ClassNames implements Renderable
{
    /**
     * @var string[]
     * ALl class names
     */
    public $values;


    /**
     * ClassNames constructor.
     * @param array $values All class names
     */
    public function __construct(array $values = [])
    {
        $this->values = $values;
    }


    /**
     * Add a class name to the list
     * @param string|null $newValue
     */
    public function add(?string $newValue) : void
    {
        $newValue = Strings::nonEmptyString($newValue);
        if (is_null($newValue)) return;

        // Prevent duplicates
        foreach ($this->values as $value) {
            if ($newValue == $value) return;
        }

        $this->values[] = $newValue;
    }


    /**
     * @inheritdoc
     */
    public function render() : string
    {
        $ret = '';
        foreach ($this->values as $value) {
            $ret .= ' ' . $value;
        }

        return substr($ret, 1);
    }
}