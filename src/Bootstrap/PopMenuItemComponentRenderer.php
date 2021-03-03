<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class PopMenuItemComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $elementType = 'button';

        $contents = [];
        $context->exportSlot($contents);

        $hasAttrDivider = $context->hasExtractedAttribute('x-divider');
        $hasAttrHeader = $context->hasExtractedAttribute('x-header');
        $hasAttrDisabled = $context->hasExtractedAttribute('x-disabled');
        $attrHref = $context->getExtractedAttribute('x-href');

        if ($hasAttrDivider) {
            $context->addClass('dropdown-divider');
            return new ElementDefinition('div', $context->finalizeAttributes(), []);
        }

        $context->addClass('dropdown-item');

        if ($hasAttrHeader) {
            $elementType = 'h6';
            $context->addClass('dropdown-header');
        } else {
            if ($hasAttrDisabled) {
                $context->addClass('disabled');
            }

            if (!is_null($attrHref)) {
                $elementType = 'a';
                $context->addAttribute('href', $attrHref);
            }
        }

        return new ElementDefinition($elementType, $context->finalizeAttributes(), $contents);
    }
}