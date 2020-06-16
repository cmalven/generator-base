<?php

/**
 * Configuration file for Imager
 *
 * Multi-environment settings work in this file the same way as in general.php or db.php
 */

return array(
    'transformer' => 'imgix',
    'useForCpThumbs' => true,
    'imgixApiKey' => 'xxxxxxxxxxxxxxxxxxxxx',

    'imgixConfig' => [
        'default' => [
            'domain' => '<%= projectName %>.imgix.net',
            'useHttps' => true,
            'signKey' => 'xxxxxxxxxxxxxxxxxxxxx',
            'useCloudSourcePath' => true,
            'sourceIsWebProxy' => false,
            'getExternalImageDimensions' => false,
        ]
    ]
);
