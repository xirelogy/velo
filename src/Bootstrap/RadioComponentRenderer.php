<?php

namespace Xirelogy\Velo\Bootstrap;

class RadioComponentRenderer extends CheckAndRadioComponentRenderer
{
    /**
     * @inheritDoc
     */
    protected function getInputType() : string
    {
        return 'radio';
    }
}