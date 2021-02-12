<?php

namespace Xirelogy\Velo;

use Exception;
use Xirelogy\Velo\Exceptions\UndefinedException;

/**
 * Class Factory
 * @package Xirelogy\Velo
 *
 * Factory to renderer
 */
class BridgeFactory
{
    /**
     * Get current bridge instance
     * @return Bridge
     * @throws Exception
     */
    public static function getCurrentInstance() : Bridge
    {
        $className = config('view.velo.bridge');
        if (is_null($className)) throw new UndefinedException('velo bridge');

        return new $className();
    }
}