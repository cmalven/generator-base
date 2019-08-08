<?php

return [
  'showLabel' => filter_var(getenv('ENV_LABEL'), FILTER_VALIDATE_REGEXP,  array(
     'options' => array('regexp' => "/.*/")
  )),
  'labelText' => getenv('ENV_LABEL'),
  'prefix' => null,
  'suffix' => null,
  'labelColor' => getenv('ENV_COLOR'),
  'textColor' => '#ffffff',
];
