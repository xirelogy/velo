<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\RenderContext;

class InputGroupStaticComponentRenderer implements ComponentRenderer
{
    /**
     * @var string
     * Associated class name
     */
    private $className;


    /**
     * InputGroupStaticComponentRenderer constructor.
     * @param string $className
     */
    public function __construct(string $className)
    {
        $this->className = $className;
    }


    /**
     * @inheritdoc
     */
    public function render(RenderContext $context)
    {
        $contents = [];

        $context->addClass($this->className);
        $context->exportSlot($contents);

        return new ElementDefinition('div', $context->finalizeAttributes(), [
            new ElementDefinition('span', ['class' => 'input-group-text'], $contents),
        ]);
    }
}