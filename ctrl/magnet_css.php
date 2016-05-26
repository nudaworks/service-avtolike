<?php
/*
// ������ css ������, � ������� �� �����������
$d = 'constr/css/';
$e = '.css';
$list_css = array(
     $d . 'reset' . $e,
     $d . 'default' . $e,
     $d . 'flip' . $e,
     $d . $_page . $e,
);

// ��������� ���, ���� �����
$cached_css = 'constr/cache/' . $_page . '.css';
$cache_mod = @filemtime($cached_css);
$refresh = false;

if ($cache_mod) {
     foreach ($list_css as $li) {
          $mod = @filemtime($li);
          if ($mod > $cache_mod) 
               $refresh = true;
     }
     if ($refresh) {
          magnet ($list_css, $cached_css);
     }
} else {
     magnet ($list_css, $cached_css);
     }



     
     */

$cached_css = 'constr/cache/' . $_page . '.css';