<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class CardComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        // Setup classes
        $context->addClass('card');
        $titleClasses = new ClassNames(['card-title']);
        $bodyClasses = new ClassNames(['card-body']);

        // Check for title
        $slotTitle = $context->getSlot('title');
        if (!is_null($slotTitle)) {
            $contents[] = new ElementDefinition('h5', ['class' => $titleClasses], $slotTitle);
        }

        // Then content
        $context->exportSlot($contents);

        return new ElementDefinition('div', $context->finalizeAttributes(), [
            new ElementDefinition('div', ['class' => $bodyClasses], $contents),
        ]);
    }
}