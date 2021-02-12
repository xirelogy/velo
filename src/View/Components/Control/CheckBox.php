<?php

namespace Xirelogy\Velo\View\Components\Control;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class CheckBox extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        $contents = [];

        $contents[] = (new ElementDefinition('input', ['type' => 'checkbox']))->single();
        $context->exportSlot($contents);

        return $contents;
    }
}