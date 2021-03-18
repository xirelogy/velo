<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class BreadcrumbComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addAttribute('role', 'breadcrumb');

        return new ElementDefinition('nav', $context->finalizeAttributes(), [
            new ElementDefinition('ol', ['class' => 'breadcrumb'], $contents),
        ]);
    }
}