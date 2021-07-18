<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class CardComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritDoc
     */
    public function render(RenderContext $context)
    {
        $outContents = [];

        $contents = [];

        // Setup classes
        $context->addClass('card');
        $headerClasses = new ClassNames(['card-header']);
        $titleClasses = new ClassNames(['card-title']);
        $bodyClasses = new ClassNames(['card-body']);
        $footerClasses = new ClassNames(['card-footer']);

        self::mergeCustomClasses($headerClasses, $context->getExtractedAttribute('x-header-class'));
        self::mergeCustomClasses($titleClasses, $context->getExtractedAttribute('x-title-class'));
        self::mergeCustomClasses($bodyClasses, $context->getExtractedAttribute('x-body-class'));
        self::mergeCustomClasses($footerClasses, $context->getExtractedAttribute('x-footer-class'));

        // Check for header
        $slotHeader = $context->getSlot('header');
        if (!is_null($slotHeader)) {
            $outContents[] = new ElementDefinition('div', ['class' => $headerClasses], $slotHeader);
        }

        // Check for title
        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $contents[] = new ElementDefinition('h5', ['class' => $titleClasses], $slotTitle);
        }

        // Then content
        $context->exportSlot($contents);
        $outContents[] = new ElementDefinition('div', ['class' => $bodyClasses], $contents);

        // Check for footer
        $slotFooter = $context->getSlot('footer');
        if (!is_null($slotFooter)) {
            $outContents[] = new ElementDefinition('div', ['class' => $footerClasses], $slotFooter);
        }

        return new ElementDefinition('div', $context->finalizeAttributes(), $outContents);
    }


    /**
     * Merge custom classes
     * @param ClassNames $classes
     * @param string|null $source
     */
    private static function mergeCustomClasses(ClassNames $classes, ?string $source) : void
    {
        if (is_null($source)) return;

        $explodeClasses = explode(' ', $source);
        foreach ($explodeClasses as $explodeClass) {
            $classes->add($explodeClass);
        }
    }
}