<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

abstract class CheckAndRadioComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $inputId = Helper::generateId();

        $context->addAttribute('id', $inputId);
        $context->addAttribute('type', $this->getInputType());
        $context->addClass('custom-control-input');

        $contents = [];
        $context->exportSlot($contents);

        $labelAttributes = [];
        $labelAttributes['class'] = 'custom-control-label';
        $labelAttributes['for'] = $inputId;

        $attrId = $context->getNormalAttribute('id');
        if (!is_null($attrId)) $labelAttributes['for'] = $attrId;

        return new ElementDefinition('div', ['class' => 'custom-control ' . $this->getCustomClass()], [
            (new ElementDefinition('input', $context->finalizeAttributes(), []))->single(),
            new ElementDefinition('label', $labelAttributes, $contents),
        ]);
    }


    /**
     * Get the input type
     * @return string
     */
    protected abstract function getInputType() : string;


    /**
     * Get the custom class
     * @return string
     */
    protected abstract function getCustomClass() : string;
}