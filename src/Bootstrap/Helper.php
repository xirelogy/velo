<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Html\ClassNames;
use Xirelogy\Velo\Html\ElementDefinition;

class Helper
{
    /**
     * Create a random string
     * @param int $length Length of the string
     * @param string $charset Character set to pick characters from
     * @return string Result random string
     */
    public static function createRandom(int $length, string $charset) : string
    {
        $numChars = strlen($charset);

        $ret = '';
        for ($i = 0; $i < $length; ++$i) {
            $r = mt_rand(0, $numChars - 1);
            $ret .= substr($charset, $r, 1);
        }

        return $ret;
    }


    /**
     * Generic an anonymous unique ID
     * @return string
     */
    public static function generateId() : string
    {
        return 'velo-anon-' . self::createRandom(12, 'abcdefghijklmnopqrstuvwxyz');
    }


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