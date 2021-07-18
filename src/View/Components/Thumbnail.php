<?php

namespace Xirelogy\Velo\View\Components;

use Xirelogy\Velo\View\Component;
use Xirelogy\Velo\View\RenderContext;

class Thumbnail extends Component
{
    /**
     * @inheritDoc
     */
    protected function onRender(RenderContext $context)
    {
        $attrDataSrc = $context->getExtractedAttribute('data-src');
        if (!is_null($attrDataSrc)) {
            $context->addAttribute('src', $attrDataSrc);
        }

        $context->addClass('velo-thumbnail');

        return $context->simpleWrap('img')->single();
    }
}