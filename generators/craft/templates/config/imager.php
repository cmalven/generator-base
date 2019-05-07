<?php

/**
 * Configuration file for Imager
 *
 * Override this by placing a file named 'imager.php' inside your config folder and override variables as needed.
 * Multi-environment settings work in this file the same way as in general.php or db.php
 */

return array(
    'transformer' => 'imgix',
    'useForCpThumbs' => true,
    'imgixApiKey' => 'xxxxxxxxxxxxxxxxxxxxx',

    'imgixConfig' => [
        'default' => [
            'domains' => ['<%= projectName %>.imgix.net'],
            'useHttps' => true,
            'signKey' => 'xxxxxxxxxxxxxxxxxxxxx',
            'useCloudSourcePath' => true,
            'sourceIsWebProxy' => false,
            'getExternalImageDimensions' => false,
        ]
    ]
);
