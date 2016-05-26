<?php

function db_connect() // поключение к выбранной базе данных
    {     
        $host = 'localhost';
        $user = 'xenonlp_minstall';
        $pswd = 'q12345';
        $db = 'xenonlp_minstall';

        $connection = mysql_connect($host, $user, $pswd);
        $selection = mysql_select_db($db);
        
        mysql_query ("set character_set_client='cp1251'");  
        mysql_query ("set character_set_results='cp1251'");  
        mysql_query ("set collation_connection='cp1251_general_ci'"); 
        
        if(!$connection || !$selection)
        {
            echo "You have failed in DB connecting <b>$db</b>:( <br>";
            echo mysql_errno();
            echo mysql_error();
            exit;
        }
        return $connection . $selection;
    }
    
#
db_connect();


ini_set ("session.use_trans_sid", true); 	
session_start(); 
if(isset($_COOKIE['avtolike_xenon']) && ($_COOKIE['avtolike_xenon'] * 0) == 0)
     {
     //echo "E1";
     $cookieID = $_COOKIE['avtolike_xenon'];
     mysql_query("UPDATE `multi_traffic` SET `hits`=`hits` +1 WHERE id='$cookieID' ");
     setcookie ("avtolike_xenon", $cookieID, time() + 3600 * 24 * 30, '/'); 
     }
     else
          {
          //echo "E2";
          $ip = $_SERVER['REMOTE_ADDR'];
          mysql_query ("INSERT INTO `multi_traffic` (ip, page, hits)
                                   VALUES ('$ip', 'avtolike_xenon', '1')");
          $q = mysql_query("SELECT * FROM `multi_traffic` ORDER BY `id` DESC LIMIT 1");
          $r = mysql_fetch_array($q);
          $cookieID = $r['id'];
          //echo $cookieID;
          setcookie ("avtolike_xenon", $cookieID, time() + 3600 * 24 * 30, '/'); 
          } 	

     

function get_info () 
     {
     // сначала подсчитываем кол-во хитов
     // кол-во пользователей
     // отдельные формы
     
     }
     
     
     
     
     
     
     
     
     
     