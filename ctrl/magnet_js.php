<?php

// ������ js ������, � ������� �� �����������
$d = 'constr/js/';
$e = '.js';
$list_js = array(

);
/*     $d . 'osnova' . $e,
     $d . 'custom' . $e,
     $d . 'liquid_forms' . $e,
     $d . 'liquid_crs' . $e,
     $d . 'liquid_splr' . $e,
     $d . 'roistat' . $e,
     $d . 'yandex_metrika' . $e, $d . 'liquid_cntdn' . $e
     $d . 'google_analitics' . $e,*/
// ��������� ���, ���� �����
$cached_js = 'constr/cache/default.js';
$cache_mod = @filemtime($cached_js);
$refresh = false;

if ($cache_mod) {
     foreach ($list_js as $li) {
          $mod = @filemtime($li);
          if ($mod > $cache_mod) 
               $refresh = true;
     }
     if ($refresh) {
          magnet($list_js, $cached_js);
     }
} else {
     magnet($list_js, $cached_js);
     }

// ���������� js
echo '<script src="' . $cached_js . '"></script>';
     
     
     