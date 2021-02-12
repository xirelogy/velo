<?php

namespace Xirelogy\Velo\View\Components\Control;

use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Select extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        return $context->simpleWrap('select');
    }
}