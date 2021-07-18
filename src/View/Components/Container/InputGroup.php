<?php

namespace Xirelogy\Velo\View\Components\Container;

use Xirelogy\Velo\Exceptions\UnsupportedException;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class InputGroup extends Component
{
    /**
     * @inheritDoc
     */
    protected function onRender(RenderContext $context)
    {
        return $context->simpleWrap('div');
    }
}