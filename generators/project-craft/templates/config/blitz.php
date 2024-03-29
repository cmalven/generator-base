<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

/**
 * Blitz config.php
 *
 * This file exists only as a template for the Blitz settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'blitz.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [
    // Whether static file caching should be enabled.
    'cachingEnabled' => filter_var(getenv('CRAFT_TEMPLATE_CACHING'), FILTER_VALIDATE_BOOLEAN),

    // Enable debugging
    'debug' => false,

    // The URI patterns to include in caching. Set `siteId` to a blank string to indicate all sites.
    'includedUriPatterns' => [
       [
           'siteId' => '',
           'uriPattern' => '',
       ],
       [
           'siteId' => '',
           'uriPattern' => '.*',
       ],
    ],

    // The URI patterns to exclude from caching (overrides any matching patterns to include). Set `siteId` to a blank string to indicate all sites.
    'excludedUriPatterns' => [

    ],

    // Whether the cache should automatically be cleared when elements are updated.
    'clearCacheAutomatically' => true,

    // Whether the cache should automatically be warmed after clearing.
    'warmCacheAutomatically' => true,

    // The warmer settings.
    'cacheWarmerSettings' => ['concurrency' => 3],

    // Whether the cache should automatically be refreshed after a global set is updated.
    'refreshCacheAutomaticallyForGlobals' => true,

    // Whether URLs with query strings should cached and how.
    // 0: Do not cache URLs with query strings
    // 1: Cache URLs with query strings as unique pages
    // 2: Cache URLs with query strings as the same page
    'queryStringCaching' => 0,
];
