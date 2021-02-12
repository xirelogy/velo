<?php

namespace Xirelogy\Velo\Exceptions;

use Exception;
use Throwable;

class UndefinedException extends Exception
{
    /**
     * UndefinedException constructor.
     * @param string|null $item
     * @param int $code
     * @param Throwable|null $previous
     */
    public function __construct(?string $item = null, $code = 0, Throwable $previous = null)
    {
        $message = self::formatMessage($item);

        parent::__construct($message, $code, $previous);
    }


    /**
     * @param string|null $item
     * @return string
     */
    private static function formatMessage(?string $item) : string
    {
        if (is_null($item)) {
            return 'Required item is undefined';
        } else {
            return '\'' . $item . '\' is undefined';
        }
    }
}