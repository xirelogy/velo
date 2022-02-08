<?php

namespace Xirelogy\Velo\View\Components\Control;

use Xirelogy\Velo\Exceptions\UnsupportedException;
use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class InputTags extends Component
{
    /**
     * @inheritDoc
     */
    protected function onRender(RenderContext $context)
    {
        throw new UnsupportedException();
    }
}