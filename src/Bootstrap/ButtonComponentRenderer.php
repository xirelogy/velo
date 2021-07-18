<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class ButtonComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $attrAction = $context->getExtractedAttribute('x-action');
        if (!is_null($attrAction)) {
            $context->addAttribute('type', $attrAction);
        } else {
            $context->addAttribute('type', 'button');
        }

        $attrParent = $context->getExtractedAttribute('x-parent');
        if (!is_null($attrParent)) {
            switch ($attrParent) {
                case 'nav-bar':
                case 'navbar':
                    $context->addClass('navbar-toggler');
                    break;
                default:
                    break;
            }
        }

        $isOutline = $context->hasExtractedAttribute('x-outline');

        $context->addClass('btn');
        $attrType = $context->getExtractedAttribute('x-type');
        if (!is_null($attrType)) {
            if ($isOutline) $attrType = 'outline-' . $attrType;
            $context->addClass('btn-' . $attrType);
        }

        return new ElementDefinition('button', $context->finalizeAttributes(), $contents);
    }
}