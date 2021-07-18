<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class ToastComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        $context->addClass('toast');
        $context->addAttribute('role', 'alert');
        $context->addAttribute('aria-live', 'assertive');
        $context->addAttribute('aria-atomic', 'true');

        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $titleContents = [];
            $titleContents[] = $slotTitle;

            if ($context->hasExtractedAttribute('x-close-button')) {
                $titleContents[] = Helper::createCloseButton('toast', ['ml-2', 'mb-1']);
            }

            $contents[] = new ElementDefinition('div', [
                'class' => 'toast-header',
            ], $titleContents);
        }

        $slot = $context->getSlot();
        $contents[] = new ElementDefinition('div', [
            'class' => 'toast-body',
        ], $slot);

        return new ElementDefinition('div', $context->finalizeAttributes(), $contents);
    }
}