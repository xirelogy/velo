<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class FormGroupComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
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

        $slotValidateSucceed = $context->getSlot('validateSucceed');
        if (!is_null($slotValidateSucceed)) {
            $contents[] = new ElementDefinition('div', [
                'class' => 'valid-feedback',
            ], $slotValidateSucceed);
        }

        $slotValidateFailed = $context->getSlot('validateFailed');
        if (!is_null($slotValidateFailed)) {
            $contents[] = new ElementDefinition('div', [
                'class' => 'invalid-feedback',
            ], $slotValidateFailed);
        }

        $context->addClass('form-group');
        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}