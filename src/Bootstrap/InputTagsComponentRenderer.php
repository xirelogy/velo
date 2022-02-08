<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class InputTagsComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $context->addClass('form-control');
        $context->addClass('velo-input-tags');

        return new ElementDefinition('div', $context->finalizeAttributes(), [
            new ElementDefinition('input', [
                'class' => 'form-control'
            ]),
        ]);
    }
}