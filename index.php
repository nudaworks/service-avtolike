<?php
//ini_set('display_errors',7);
//error_reporting(E_ALL);

include 'proc/lib.php';
include 'ctrl/router.php';

$_v = ''; // версия страницы

include 'ctrl/meta.php';

// собираем контент страницы
$d = 'constr/tpl/default/';
$s = 'constr/tpl/' . $_page . '/';
include 'constr/order/' . $_page .  '.php';
foreach ($content as $c) @include $c . $_v . '.tpl';

// собираем JS в один файл
include 'ctrl/magnet_js.php';

// отдельно подключаем счеткики метрик (подключением через файл они не работают)
// include 'constr/js/yandex_metrika.js';

if (!empty($_GET['utm'])) {
  $to1 = 'xenon.akk@gmail.com';
  $utm1 = $_GET['utm'];
  $time1 = date("j M Y (H:i:s)");
  $subject1 = 'Teaser Alert!';
  $message1 = "Teased 'xenon' From $utm1 On $time1";
  mail($to1, $subject1, $message1);
  }
?>