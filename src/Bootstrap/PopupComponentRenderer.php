<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class PopupComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        $contents[] = new ElementDefinition('div', [
            'class' => 'arrow',
        ]);

        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $contents[] = new ElementDefinition('h3', [
                'class' => 'popover-header'
            ], $slotTitle);
        }

        $slot = $context->getSlot();
        $contents[] = new ElementDefinition('div', [
            'class' => 'popover-body',
        ], $slot);

        $context->addClass('popover');
        $context->addClass('velo-hidden');
        $context->addAttribute('role', 'tooltip');

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}