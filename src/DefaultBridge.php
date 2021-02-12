<?php

namespace Xirelogy\Velo;

use Xirelogy\Velo\View\ComponentRenderer;

class DefaultBridge extends Bridge
{
    /**
     * @inheritdoc
     */
    protected function getStyles() : iterable
    {
        return [];
    }


    /**
     * @inheritdoc
     */
    public function getComponentRenderer(string $className) : ?ComponentRenderer
    {
        return null;
    }
}