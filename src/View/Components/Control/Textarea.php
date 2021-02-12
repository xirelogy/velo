<?php

namespace Xirelogy\Velo\View\Components\Control;

use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Textarea extends Component
{

    /**
     * @inheritDoc
     */
    protected function onRender(RenderContext $context)
    {
        return $context->simpleWrap('textarea');
    }
}