<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class LoadingComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $spinnerType = 'border';
        $attrType = $context->getExtractedAttribute('x-type');
        if (!is_null($attrType)) {
            switch ($attrType) {
                case 'grow':
                    $spinnerType = 'grow';
                    break;
                case 'spin':
                    $spinnerType = 'border';
                    break;
            }
        }

        $context->addClass('spinner-' . $spinnerType);
        $context->addAttribute('role', 'status');

        $attrParent = $context->getExtractedAttribute('x-parent');
        switch ($attrParent) {
            case 'button':
                $context->addClass('spinner-' . $spinnerType . '-sm');
                break;
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), [
            new ElementDefinition('span', [
                'class' => 'sr-only'
            ], 'Loading...')
        ]);
    }
}