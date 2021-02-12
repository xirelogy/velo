<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class AlertComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addAttribute('role', 'alert');

        $context->addClass('alert');
        $attrType = $context->getExtractedAttribute('x-type');
        if (!is_null($attrType)) {
            $context->addClass('alert-' . $attrType);
        }

        if ($context->hasExtractedAttribute('x-close-button')) {
            $contents[] = Helper::createCloseButton('alert');
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}