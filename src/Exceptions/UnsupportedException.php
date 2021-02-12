<?php

namespace Xirelogy\Velo\Exceptions;

use Exception;
use Throwable;

class UnsupportedException extends Exception
{
    /**
     * UnsupportedException constructor.
     * @param string $message
     * @param int $code
     * @param Throwable|null $previous
     */
    public function __construct($message = '', $code = 0, Throwable $previous = null)
    {
        if (empty($message)) $message = 'Unsupported operation';

        parent::__construct($message, $code, $previous);
    }
}