<?php

namespace Xirelogy\Velo\Bootstrap;

use Xirelogy\Velo\Bridge as BaseBridge;
use Xirelogy\Velo\Exceptions\UndefinedException;
use Xirelogy\Velo\Html\ElementDefinition;
use Xirelogy\Velo\View\ComponentRenderer;
use Xirelogy\Velo\View\Components\Container\Alert;
use Xirelogy\Velo\View\Components\Container\Breadcrumb;
use Xirelogy\Velo\View\Components\Container\Card;
use Xirelogy\Velo\View\Components\Container\Dialog;
use Xirelogy\Velo\View\Components\Container\FormGroup;
use Xirelogy\Velo\View\Components\Container\InputGroup;
use Xirelogy\Velo\View\Components\Container\InputGroupPrefix;
use Xirelogy\Velo\View\Components\Container\InputGroupSuffix;
use Xirelogy\Velo\View\Components\Container\NavBar;
use Xirelogy\Velo\View\Components\Container\Page;
use Xirelogy\Velo\View\Components\Container\PopMenu;
use Xirelogy\Velo\View\Components\Container\Toast;
use Xirelogy\Velo\View\Components\Control\Button;
use Xirelogy\Velo\View\Components\Control\CheckBox;
use Xirelogy\Velo\View\Components\Control\Input;
use Xirelogy\Velo\View\Components\Control\Radio;
use Xirelogy\Velo\View\Components\Control\Select;
use Xirelogy\Velo\View\Components\Control\TabBar;
use Xirelogy\Velo\View\Components\Control\TabItem;
use Xirelogy\Velo\View\Components\Control\Textarea;
use Xirelogy\Velo\View\Components\Loading;
use Xirelogy\Velo\View\Components\Tag\BreadcrumbItem;
use Xirelogy\Velo\View\Components\Tag\PopMenuItem;
use Xirelogy\Velo\View\Components\Thumbnail;

class Bridge extends BaseBridge
{
    /**
     * Get the Javascript definition name
     * @return string
     */
    protected function getJsName() : string
    {
        return 'Xirelogy.Velo.Bootstrap';
    }


    /**
     * @inheritDoc
     */
    protected function getStyles() : iterable
    {
        $href = config('view.velo.bootstrap.css');
        $integrity = config('view.velo.bootstrap.css_integrity');
        if (is_null($href)) throw new UndefinedException('velo bootstrap CSS url');

        $attrs = [
            'rel' => 'stylesheet',
            'href' => $href,
            'crossorigin' => 'anonymous',
        ];
        if (!is_null($integrity)) $attrs['integrity'] = $integrity;

        yield new ElementDefinition('link', $attrs);
    }


    /**
     * @inheritdoc
     */
    public function getExtraClasses(string $className) : array
    {
        switch ($className) {
            case InputGroup::class:
                return ['input-group'];
            case PopMenu::class:
                return ['dropdown-menu'];
            case Select::class:
                return ['form-control', 'form-select'];
            case Thumbnail::class:
                return ['img-thumbnail'];
            case Input::class:
            case Textarea::class:
                return ['form-control'];
            default:
                return parent::getExtraClasses($className);
        }
    }


    /**
     * @inheritDoc
     */
    public function getComponentRenderer(string $className) : ?ComponentRenderer
    {
        switch ($className) {
            case Alert::class:
                return new AlertComponentRenderer();
            case Breadcrumb::class:
                return new BreadcrumbComponentRenderer();
            case BreadcrumbItem::class:
                return new BreadcrumbItemComponentRenderer();
            case Button::class:
                return new ButtonComponentRenderer();
            case Card::class:
                return new CardComponentRenderer();
            case CheckBox::class:
                return new CheckBoxComponentRenderer();
            case Dialog::class:
                return new DialogComponentRenderer();
            case FormGroup::class:
                return new FormGroupComponentRenderer();
            case InputGroupPrefix::class:
                return new InputGroupStaticComponentRenderer('input-group-prepend');
            case InputGroupSuffix::class:
                return new InputGroupStaticComponentRenderer('input-group-append');
            case Loading::class:
                return new LoadingComponentRenderer();
            case NavBar::class:
                return new NavBarComponentRenderer();
            case Page::class:
                return new PageComponentRenderer();
            case PopMenuItem::class:
                return new PopMenuItemComponentRenderer();
            case Radio::class:
                return new RadioComponentRenderer();
            case TabBar::class:
                return new TabBarComponentRenderer();
            case TabItem::class:
                return new TabItemComponentRenderer();
            case Toast::class:
                return new ToastComponentRenderer();
            default:
                return null;
        }
    }
}