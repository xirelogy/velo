<?php

namespace Xirelogy\Velo\View\Components\Tag;

use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class DataValue extends Component
{
    /**
     * @inheritdoc
     */
    protected function onRender(RenderContext $context)
    {
        return $context->simpleWrap('dd');
    }
}