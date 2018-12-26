<?php

return [
  'showLabel' => filter_var(getenv('APP_ENV_LABEL'), FILTER_VALIDATE_REGEXP,  array(
     'options' => array('regexp' => "/.*/")
  )),
  'labelText' => getenv('APP_ENV_LABEL'),
  'prefix' => null,
  'suffix' => null,
  'labelColor' => getenv('APP_ENV_COLOR'),
  'textColor' => '#ffffff',
];