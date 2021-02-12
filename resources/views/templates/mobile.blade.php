<!DOCTYPE html>
<html>
<head>
    <meta charset="'utf-8"/>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'/>
    <title>@yield('title')</title>
<?php echo \Xirelogy\Velo\BridgeFactory::getCurrentInstance()->renderHeadCss() ?>
    @stack('head_css')
    @stack('head_js')
</head>
<body>
@section('body')
@show
</body>
</html>