<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

abstract class CheckAndRadioComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $context->addAttribute('type', $this->getInputType());
        $context->addClass('form-check-input');

        $contents = [];
        $context->exportSlot($contents);

        $labelAttributes = [];
        $labelAttributes['class'] = 'form-check-label';

        $attrId = $context->getNormalAttribute('id');
        if (!is_null($attrId)) $labelAttributes['for'] = $attrId;

        return new ElementDefinition('div', ['class' => 'form-check'], [
            (new ElementDefinition('input', $context->finalizeAttributes(), []))->single(),
            new ElementDefinition('label', $labelAttributes, $contents),
        ]);
    }


    /**
     * Get the input type
     * @return string
     */
    protected abstract function getInputType() : string;
}