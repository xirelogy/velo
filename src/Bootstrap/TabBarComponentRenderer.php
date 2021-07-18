<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class TabBarComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addClass('nav');
        $context->addClass('nav-tabs');

        return new ElementDefinition('ul', $context->finalizeAttributes(), $contents);
    }
}