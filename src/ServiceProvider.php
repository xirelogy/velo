<?php

namespace Xirelogy\Velo;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Illuminate\View\Compilers\BladeCompiler;

class ServiceProvider extends BaseServiceProvider
{
    private const VIEW_PATH = __DIR__ . '/../resources/views';


    /**
     * Bootstrap the application services
     */
    public function boot() : void
    {
        $this->loadViewsFrom(self::VIEW_PATH, 'velo');

        Blade::componentNamespace('Xirelogy\\Velo\\View\\Components', 'velo');
    }


    /**
     * Register the application services
     */
    public function register() : void
    {

    }


    /**
     * @inheritdoc
     */
    protected function loadViewComponentsAs($prefix, array $components)
    {
        $this->callAfterResolving(BladeCompiler::class, function($blade) use($prefix, $components) {
            foreach ($components as $alias => $component) {
                $blade->component($component, is_numeric($alias) ? null : $alias, $prefix);
            }
        });
    }
}