<?php

namespace Xirelogy\Velo\Html;

/**
 * Class Renderer
 * @package Xirelogy\Velo\Html
 *
 * Utility to render into HTML
 */
class Renderer
{
    /**
     * Render the given target into HTML
     * @param mixed $target Target to be rendered
     * @return string
     */
    public static function finalize($target) : string
    {
        if (is_null($target)) return '';
        if (is_string($target)) return $target;
        if ($target instanceof Renderable) return $target->render();

        if (is_iterable($target)) {
            $ret = '';
            foreach ($target as $subTarget) {
                $ret .= self::finalize($subTarget);
            }
            return $ret;
        }

        // Fallback: force rendering as a target
        return '' . $target;
    }
}