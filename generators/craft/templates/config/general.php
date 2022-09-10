<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

use craft\helpers\App;

return [
    '*' => [
        // FUZZY SEARCH
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        // ASSETS
        'imageDriver'                        => App::env('CRAFT_IMAGE_DRIVER'),
        'defaultImageQuality'                => 90,
        'maxUploadFileSize'                  => '4M',
        'extraFileKinds' => [
            'svg' => [
                'label' => 'SVG',
                'extensions' => ['svg'],
            ],
            'jpg' => [
                'label' => 'JPEG',
                'extensions' => ['jpg', 'jpeg'],
            ],
            'png' => [
                'label' => 'PNG',
                'extensions' => ['png'],
            ],
            'mp4' => [
                'label' => 'MP4',
                'extensions' => ['mp4'],
            ],
        ],

        // MISC
        'devMode'                            => filter_var(App::env('CRAFT_DEV_MODE'), FILTER_VALIDATE_BOOLEAN),
        'allowUpdates'                       => false,
        'allowAdminChanges'                  => false,
        'maxRevisions'                       => 15,

        // URLS
        'omitScriptNameInUrls'               => true,
        'cpTrigger'                          => App::env('CRAFT_CP_TRIGGER'),

        // CACHING
        'enableTemplateCaching'              => filter_var(App::env('CRAFT_TEMPLATE_CACHING'), FILTER_VALIDATE_BOOLEAN),
        'maxCachedCloudImageSize'            => 0,

        // SECURITY
        'cooldownDuration'                   => 'PT5M',
        'invalidLoginWindowDuration'         => 'PT1H',
        'userSessionDuration'                => 3600,
        'preventUserEnumeration'             => true,
        'sendPoweredByHeader'                => false,
    ],

    'dev' => [
        'allowUpdates'                       => true,
        'allowAdminChanges'                  => true,
    ],

    'staging' => [],

    'production' => [],
];
