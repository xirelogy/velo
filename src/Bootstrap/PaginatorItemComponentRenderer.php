<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class PaginatorItemComponentRenderer implements ComponentRenderer
{
    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];
        $context->exportSlot($contents);

        $context->addClass('page-item');

        $attrType = $context->getExtractedAttribute('x-type');
        $attrDisabled = $context->hasExtractedAttribute('x-disabled');
        $attrActive = $context->hasExtractedAttribute('x-active');

        switch ($attrType) {
            case 'prev':
            case 'previous':
                $context->addAttribute('aria-label', 'Previous');
                $context->addAttribute('data-kind', 'prev');
                $contents = [
                    new ElementDefinition('span', [
                        'aria-hidden' => 'true'
                    ], '&laquo;'),
                    new ElementDefinition('span', [
                        'class' => 'sr-only'
                    ], 'Previous'),
                ];
                break;

            case 'next':
                $context->addAttribute('aria-label', 'Next');
                $context->addAttribute('data-kind', 'next');
                $contents = [
                    new ElementDefinition('span', [
                        'aria-hidden' => 'true'
                    ], '&raquo;'),
                    new ElementDefinition('span', [
                        'class' => 'sr-only'
                    ], 'Next'),
                ];
                break;

            case 'more':
                $context->addAttribute('data-kind', 'more');
                $attrDisabled = true;
                $contents = '...';
                break;
        }

        $linkAttributes = [
            'class' => 'page-link',
            'href' => '#',
        ];

        if ($attrDisabled) {
            $context->addClass('disabled');
            $linkAttributes['tabindex'] = '-1';
        } else if ($attrActive) {
            $context->addClass('active');
        }

        return new ElementDefinition('li', $context->finalizeAttributes(), [
            new ElementDefinition('a', $linkAttributes, $contents),
        ]);
    }
}