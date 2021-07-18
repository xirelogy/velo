<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class PageComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $hasFullX = $context->hasExtractedAttribute('x-full-x');
        $hasFullY = $context->hasExtractedAttribute('x-full-y');

        $context->addClass('container');

        if ($hasFullX) {
            $context->addClass('px-0');
        }

        if ($hasFullY) {
            $context->addClass('py-0');
        } else {
            $context->addClass('py-3');
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}