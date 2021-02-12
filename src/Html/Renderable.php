<?php

namespace Xirelogy\Velo\Html;

/**
 * Interface Renderable
 * @package Xirelogy\Velo\Html
 *
 * Anything that can be rendered into text representing HTML
 */
interface Renderable
{
    /**
     * Render the HTML into string
     * @return string
     */
    public function render() : string;
}