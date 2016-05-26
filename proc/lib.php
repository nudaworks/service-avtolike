<?php

function recognise_page ($k) {
     include 'friendly_url.php';
     $p = 'default';
     foreach ($urls as $url => $u) {
          if ($k == $u)
               $p = $url;
          }
     return $p;
}

function magnet ($array, $output) {
     $content = '';
     foreach ($array as $file)
          $content .= @file_get_contents($file);
     file_put_contents ($output, '' . $content . '');
}