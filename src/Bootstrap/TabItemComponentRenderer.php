<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class TabItemComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addClass('nav-link');

        if ($context->hasExtractedAttribute('x-active')) {
            $context->addClass('active');
        }

        if ($context->hasExtractedAttribute('x-disabled')) {
            $context->addClass('disabled');
            $context->addAttribute('tabindex', '-1');
            $context->addAttribute('aria-disabled', 'true');
        }

        return new ElementDefinition('li', ['class' => 'nav-item'], [
            new ElementDefinition('a', $context->finalizeAttributes(), $contents),
        ]);
    }
}