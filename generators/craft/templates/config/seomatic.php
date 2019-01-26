<?php
return [
    '*' => [
        // The public-facing name of the plugin
        'pluginName' => 'SEO',

        // The server environment, either `live`, `staging`, or `local`
        'environment' => getenv('SEO_ENV'),
    ]
];
