<?php
return array(
    '*' => array(
        'strategies' => [
            'manifest' => \club\assetrev\utilities\strategies\ManifestFileStrategy::class,
            'passthrough' => function ($filename, $config) {
                return $filename;
            },
        ],
        'pipeline' => 'manifest|passthrough',
        'manifestPath' => 'web/dist/rev-manifest.json',
        'assetsBasePath' => 'web/dist/',
        'assetUrlPrefix' => '/dist/'
    )
);
