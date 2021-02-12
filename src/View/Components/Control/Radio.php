<?php

namespace Xirelogy\Velo\View\Components\Control;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Radio extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        $context->addAttribute('type', 'radio');

        $contents = [];
        $context->exportSlot($contents);

        return new ElementDefinition('label', [], [
            (new ElementDefinition('input', $context->finalizeAttributes()))->single(),
            $contents,
        ]);
    }
}