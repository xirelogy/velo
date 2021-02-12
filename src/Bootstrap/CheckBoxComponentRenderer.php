<?php

namespace Xirelogy\Velo\Bootstrap;

class CheckBoxComponentRenderer extends CheckAndRadioComponentRenderer
{
    /**
     * @inheritdoc
     */
    protected function getInputType() : string
    {
        return 'checkbox';
    }
}