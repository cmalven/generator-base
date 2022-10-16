<?php

use craft\helpers\App;

/**
 * Configuration file for Imager
 *
 * Multi-environment settings work in this file the same way as in general.php or db.php
 */

return array(
    'transformer' => 'imgix',
    //'useForCpThumbs' => true,
    //'imgixApiKey' => App::env('IMGIX_API_KEY'),
    //
    //'imgixConfig' => [
    //    'default' => [
    //        'domain' => App::env('IMGIX_DOMAIN'),
    //        'useHttps' => true,
    //        'signKey' => App::env('IMGIX_SIGN_KEY'),
    //        'useCloudSourcePath' => true,
    //        'sourceIsWebProxy' => false,
    //        'getExternalImageDimensions' => false,
    //    ]
    //]
);
