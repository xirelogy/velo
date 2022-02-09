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


    /**
     * @inheritDoc
     */
    protected function getCustomClass() : string
    {
        return 'custom-radio';
    }
}