<?php

namespace Xirelogy\Velo\Utils;

class Strings
{
    /**
     * Trim and check given string value, converting all empty or meaningless value into default
     * @param string|null $value String value to be checked
     * @param string|null $default Default if value is null or empty
     * @return string|null
     */
    public static function nonEmptyString(?string $value, ?string $default = null) : ?string
    {
        if (is_null($value)) return $default;

        $value = trim($value);
        return !empty($value) ? $value : $default;
    }
}