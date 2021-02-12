<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;

class Helper
{
    /**
     * Create and render a close button
     * @param string|null $dataDismiss Attribute for 'data-dismiss'
     * @param array $addClasses Additional classes
     * @return ElementDefinition
     */
    public static function createCloseButton(string $dataDismiss = null, array $addClasses = []) : ElementDefinition
    {
        $mainAttributes = [];

        $classes = new ClassNames(['close']);
        foreach ($addClasses as $addClass) {
            $classes->add($addClass);
        }

        // Define the main attributes
        $mainAttributes['class'] = $classes;
        if (!is_null($dataDismiss)) $mainAttributes['data-dismiss'] = $dataDismiss;
        $mainAttributes['aria-label'] = 'Close';

        return new ElementDefinition('button', $mainAttributes, new ElementDefinition('span', [
                'aria-hidden' => 'true',
            ], '&times;'));
    }
}