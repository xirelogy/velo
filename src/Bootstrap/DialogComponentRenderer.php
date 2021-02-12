<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class DialogComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $titleContents = [];

            $titleContents[] = new ElementDefinition('h5', [
                    'class' => 'modal-title'
                ], $slotTitle);

            if ($context->hasExtractedAttribute('x-close-button')) {
                $titleContents[] = Helper::createCloseButton('modal');
            }

            $contents[] = new ElementDefinition('div', [
                'class' => 'modal-header',
            ], $titleContents);
        }

        $slot = $context->getSlot();
        $contents[] = new ElementDefinition('div', [
            'class' => 'modal-body',
        ], $slot);

        $slotFooter = $context->getSlot('footer');
        if (!is_null($slotFooter)) {
            $contents[] = new ElementDefinition('div', [
                'class' => 'modal-footer',
            ], $slotFooter);
        }

        $context->addClass('modal');
        $context->addAttribute('tabindex', '-1');
        $context->addAttribute('role', 'dialog');

        $dialogClasses = new ClassNames(['modal-dialog']);

        if ($context->hasExtractedAttribute('x-vertical-align')) {
            $dialogClasses->add('modal-dialog-centered');
        }

        if ($context->hasExtractedAttribute('x-scroll-content')) {
            $dialogClasses->add('modal-dialog-scrollable');
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), [
            new ElementDefinition('div', [
                'class' => $dialogClasses,
                'role' => 'document',
            ], [
                new ElementDefinition('div', ['class' => 'modal-content'], $contents),
            ]),
        ]);
    }
}