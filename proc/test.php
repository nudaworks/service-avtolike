<?php
function db_connect() // поключение к выбранной базе данных
    {     
        $host = 'kulture.mysql.ukraine.com.ua';
        $user = 'kulture_db';
        $pswd = '5a3JlMmf';
        $db = 'kulture_db';

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
echo 'YAHOO!';

$cookieID = $_COOKIE['avtolike_xenon'];
$formH = $_POST['heading'];
$fieldN = $_POST['name'];
$fieldP = $_POST['phone'];
$fieldE = $_POST['email'];

function countConvert ($cookieID, $formH, $fieldN, $fieldP, $fieldE)
     {
     $t = time();
     $a = mysql_query ("INSERT INTO `multi_conv` (cookie_id, heading, name, phone, email, timestamp)
                                   VALUES ('$cookieID', '$formH', '$fieldN', '$fieldP', '$fieldE', '$t') "); 
     if ($a) echo "YEAP"; else echo "NOAP";
     echo mysql_error();
     }
     
     
countConvert ($cookieID, $formH, $fieldN, $fieldP, $fieldE);