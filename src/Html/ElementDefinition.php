<?php

namespace Xirelogy\Velo\Html;

/**
 * Class ElementDefinition
 * @package Xirelogy\Velo\Html
 *
 * Definition of HTML element
 */
class ElementDefinition implements Renderable
{
    /**
     * @var string
     * The HTML tag
     */
    public $tag;


    /**
     * @var array
     * Tag attributes
     */
    public $attributes;


    /**
     * @var mixed
     * Content of the element
     */
    public $content;


    /**
     * @var bool
     * If this is a single element tag
     */
    private $isSingle;


    /**
     * ElementDefinition constructor.
     * @param string $tag The element tag
     * @param array<string, Renderable|string|null> $attributes Element attributes
     * @param $content
     */
    public function __construct(string $tag, array $attributes = [], $content = null)
    {
        $this->tag = $tag;
        $this->attributes = $attributes;
        $this->content = $content;
        $this->isSingle = false;
    }


    /**
     * Set that the current element is a single tag element (without closing tag)
     * @param bool $isSingle If current element is a single tag element (default `true`)
     * @return $this
     */
    public function single(bool $isSingle = true) : self
    {
        $this->isSingle = $isSingle;
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function render(): string
    {
        if ($this->isSingle) {
            // HTML tag without closing
            return '<' . $this->tag. $this->flattenAttributes() . '/>';
        } else {
            // HTML tag with content and closing
            $ret = '';
            $ret .= '<' . $this->tag. $this->flattenAttributes() . '>';
            $ret .= Renderer::finalize($this->content);
            $ret .= '</' . $this->tag . '>';
            return $ret;
        }
    }


    /**
     * Flatten all attributes for inserting into HTML tag
     * @return string
     */
    protected function flattenAttributes() : string
    {
        $ret = '';
        foreach ($this->attributes as $key => $value) {
            if ($value instanceof ClassNames) {
                $value = $value->render();
                if (empty($value)) continue;
            } else if ($value instanceof Renderable) {
                $value = $value->render();
            }

            $ret .= ' ' . $key;
            if (!empty($value)) $ret .= '="' . self::escapeHtmlAttribute($value) . '"';
        }

        return $ret;
    }


    /**
     * Escape given value according to HTML escaping rules
     * @param string $value
     * @return string
     */
    protected static function escapeHtmlAttribute(string $value) : string
    {
        return htmlspecialchars($value);
    }
}