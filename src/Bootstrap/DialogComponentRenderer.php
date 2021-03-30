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

        $headerClasses = $context->getExtractedAttribute('x-header-class', '');
        $footerClasses = $context->getExtractedAttribute('x-footer-class', '');

        $headerClasses = explode(' ', $headerClasses);
        $footerClasses = explode(' ', $footerClasses);

        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $titleContents = [];

            $titleContents[] = new ElementDefinition('h5', [
                    'class' => 'modal-title'
                ], $slotTitle);

            if ($context->hasExtractedAttribute('x-close-button')) {
                $titleContents[] = Helper::createCloseButton('modal');
            }

            $finalHeaderClasses = ['modal-header'];
            foreach ($headerClasses as $headerClass) {
                $finalFooterClasses[] = $headerClass;
            }

            $contents[] = new ElementDefinition('div', [
                'class' => implode(' ', $finalHeaderClasses),
            ], $titleContents);
        }

        $slot = $context->getSlot();
        $contents[] = new ElementDefinition('div', [
            'class' => 'modal-body',
        ], $slot);

        $slotFooter = $context->getSlot('footer');
        if (!is_null($slotFooter)) {
            $finalFooterClasses = ['modal-footer'];
            foreach ($footerClasses as $footerClass) {
                $finalFooterClasses[] = $footerClass;
            }

            $contents[] = new ElementDefinition('div', [
                'class' => implode(' ', $finalFooterClasses),
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