<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class FormGroupComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        $slotLabel = $context->getSlot('label');
        if (!is_null($slotLabel)) {
            $contents[] = new ElementDefinition('label', [
                'class' => 'form-label',
            ], $slotLabel);
        }

        $context->exportSlot($contents);

        $context->addClass('form-group');
        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}