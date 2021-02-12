<?php

namespace Xirelogy\Velo\View;

use Xirelogy\Velo\Html\ElementDefinition;

interface ComponentRenderer
{
    /**
     * Render the component
     * @param RenderContext $context
     * @return ElementDefinition|string|null
     */
    public function render(RenderContext $context);
}