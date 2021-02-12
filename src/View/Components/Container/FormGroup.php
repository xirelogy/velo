<?php

namespace Xirelogy\Velo\View\Components\Container;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class FormGroup extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        $contents = [];

        $slotLabel = $context->getSlot('label');
        if (!is_null($slotLabel)) {
            $contents[] = new ElementDefinition('label', [], $slotLabel);
        }

        $context->exportSlot($contents);

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}