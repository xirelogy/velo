<?php

namespace Xirelogy\Velo\Bootstrap;

class RadioComponentRenderer extends CheckAndRadioComponentRenderer
{
    /**
     * @inheritdoc
     */
    protected function getInputType() : string
    {
        return 'radio';
    }
}