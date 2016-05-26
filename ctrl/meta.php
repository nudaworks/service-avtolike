<?php
$meta_default = 'Установочный центр AVTOLIKE.RU';

$meta_title_content = trim(@file_get_contents('constr/meta/title/' . $_page . '.txt'));
$meta_kwd_content = trim(@file_get_contents('constr/meta/kwd/' . $_page . '.txt'));
$meta_descr_content = trim(@file_get_contents('constr/meta/descr/' . $_page . '.txt'));

$meta_title = (strlen($meta_title_content) > 10) ? $meta_title_content : $meta_default;
$meta_kwd = (strlen($meta_kwd_content) > 10) ? $meta_kwd_content : $meta_default;
$meta_descr = (strlen($meta_descr_content) > 10) ? $meta_descr_content : $meta_default;

include 'ctrl/magnet_css.php';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
     <meta charset="utf-8" />
     <title><?php echo $meta_title; ?></title>
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <meta name="description" content="<?php echo $meta_descr; ?>" />
     <meta name="keywords" content="<?php echo $meta_kwd; ?>" />
     <link rel="shortcut icon" type="image/x-icon" href="constr/img/favicon.png">
     <link rel="stylesheet" href="<?php echo $cached_css; ?>" />
     <link rel="favicon" href="/favicon.ico" />
     <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
     <script src="constr/js/helpers.js" defer></script>
     <script src="constr/js/carousel.js" defer></script>
     <script src="constr/js/gallery.js" defer></script>
     <script src="constr/js/countdown.js" defer></script>
     <script src="constr/js/landing_form.js" defer></script>
     <script src="constr/js/collection.js" defer></script>
     <script src="constr/js/accordion.js" defer></script>
     <script src="constr/js/yandex-map.js" defer></script>
</head>
<body>