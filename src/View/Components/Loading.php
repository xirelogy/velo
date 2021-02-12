<?php

namespace Xirelogy\Velo\View\Components;

use Xirelogy\Velo\Exceptions\UnsupportedException;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Loading extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        throw new UnsupportedException();
    }
}