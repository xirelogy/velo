<?php

namespace Xirelogy\Velo;

use Xirelogy\Velo\View\ComponentRenderer;

class DefaultBridge extends Bridge
{
    /**
     * @inheritDoc
     */
    protected function getJsName() : string
    {
        return 'Xirelogy.Velo.Default';
    }


    /**
     * @inheritDoc
     */
    protected function getStyles() : iterable
    {
        return [];
    }


    /**
     * @inheritDoc
     */
    public function getComponentRenderer(string $className) : ?ComponentRenderer
    {
        return null;
    }
}