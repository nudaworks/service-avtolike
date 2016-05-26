<?php
$urls = array (
     'xenon' => 'ustanovka-ksenona-i-biksenona',
     'projector' => 'ustanovka-biksenonovyh-linz',
     'chip' => 'ustanovka-chip-tyuninga',
     'camera' => 'ustanovka-kamery-zadnego-vida',
     'parking' => 'ustanovka-parktronika',
     'drl' => 'ustanovka-dho',
     'default' => 'index',
);

if ($_GET['page'])
    {
    if (array_key_exists($_GET['page'], $urls))
        {
        $_page = $_GET['page'];
        header ("Location: /" . $urls[$_page], true, 301);
        }
    else
        {
        $key = array_search($_GET['page'], $urls);
        if ($key != false)
            {
            $_page = $key;
            }
        else
            {
            $_page = 'xenon';
            header ("Location: /", true, 302);
            }
        }
    }
else
    {
    // root page
    $_page = 'default';
    }


