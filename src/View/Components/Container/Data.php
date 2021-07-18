<?php

namespace Xirelogy\Velo\View\Components\Container;

use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Data extends Component
{
    /**
     * @inheritDoc
     */
    protected function onRender(RenderContext $context)
    {
        return $context->simpleWrap('dl');
    }
}