<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class NavBarComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addClass('navbar');

        $attrForeground = $context->getExtractedAttribute('x-foreground');
        if (!is_null($attrForeground)) {
            $context->addClass('navbar-' . $attrForeground);
        } else {
            $context->addClass('navbar-light');
        }

        $attrBackground = $context->getExtractedAttribute('x-background');
        if (!is_null($attrBackground)) {
            $context->addClass('bg-' . $attrBackground);
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}