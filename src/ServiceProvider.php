<?php

namespace Xirelogy\Velo;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Illuminate\Support\Str;
use Illuminate\View\Compilers\BladeCompiler;
use SplFileInfo;
use Symfony\Component\Finder\Finder;

class ServiceProvider extends BaseServiceProvider
{
    /**
     * The path where view resources are located
     */
    private const VIEW_PATH = __DIR__ . '/../resources/views';

    /**
     * The path where manual components are located
     */
    private const COMPONENTS_PATH = __DIR__ . '/../src/View/Components';

    /**
     * The namespace where components resides
     */
    private const COMPONENT_NAMESPACE = 'Xirelogy\\Velo\\View\\Components';

    /**
     * The namespace prefix when component is used
     */
    private const COMPONENT_PREFIX = 'velo';


    /**
     * Bootstrap the application services
     */
    public function boot() : void
    {
        $this->addBladeDirectives();

        $this->loadViewsFrom(self::VIEW_PATH, self::COMPONENT_PREFIX);

        $this->bootManualComponents();
    }


    /**
     * Add Blade directives
     */
    private function addBladeDirectives() : void
    {
        Blade::directive('pushonce', function($expression) {
            [$pushName, $pushSub] = explode(':', trim(substr($expression, 1, -1)));
            $key = '__pushonce_'.str_replace('-', '_', $pushName).'_'.str_replace('-', '_', $pushSub);
            return "<?php if(! isset(\$__env->{$key})): \$__env->{$key} = 1; \$__env->startPush('{$pushName}'); ?>";
        });

        Blade::directive('endpushonce', function() {
            return '<?php $__env->stopPush(); endif; ?>';
        });
    }


    /**
     * Bootstrap the manual components
     */
    private function bootManualComponents() : void
    {
        $componentsPath = realpath(self::COMPONENTS_PATH);
        if (!Str::endsWith($componentsPath, '/')) $componentsPath .= '/';

        $files = (new Finder())->files()->name('*.php')->in([$componentsPath]);

        collect($files)->each(function (SplFileInfo $fileInfo) use($componentsPath) {
            self::bootManualComponentFrom($componentsPath, $fileInfo);
        });
    }


    /**
     * Bootstrap specific manual component
     * @param string $componentsPath
     * @param SplFileInfo $fileInfo
     */
    private static function bootManualComponentFrom(string $componentsPath, SplFileInfo $fileInfo) : void
    {
        $currentPath = $fileInfo->getRealPath();
        if (!Str::startsWith($currentPath, $componentsPath)) return;

        $relPath = substr($currentPath, strlen($componentsPath));
        if (Str::endsWith($relPath, '.php')) $relPath = substr($relPath, 0, strlen($relPath) - 4);

        $componentName = '';
        $componentNamespace = self::COMPONENT_NAMESPACE;
        $relPathSegments = explode('/', $relPath);
        foreach ($relPathSegments as $relPathSegment) {
            $componentName .= '.' . Str::kebab($relPathSegment);
            $componentNamespace .= '\\' . $relPathSegment;
        }
        $componentName = substr($componentName, 1);

        Blade::component($componentNamespace, self::COMPONENT_PREFIX . '::' . $componentName);
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