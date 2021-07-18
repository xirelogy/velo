<?php

namespace Xirelogy\Velo\Bootstrap;

class CheckBoxComponentRenderer extends CheckAndRadioComponentRenderer
{
    /**
     * @inheritDoc
     */
    protected function getInputType() : string
    {
        return 'checkbox';
    }
}