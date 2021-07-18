<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class BreadcrumbItemComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addClass('breadcrumb-item');

        if ($context->hasExtractedAttribute('x-active')) {
            $context->addClass('active');
        }

        return new ElementDefinition('li', $context->finalizeAttributes(), $contents);
    }
}