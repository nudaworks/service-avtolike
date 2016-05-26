<?php
// собираем переменные, которые прислал нам клиент
$page = htmlspecialchars($_POST['page']);
$n = htmlspecialchars($_POST['name']);
$p = htmlspecialchars($_POST['phone']);
$e = htmlspecialchars($_POST['email']);
$h = htmlspecialchars(strip_tags(trim($_POST['heading'])));

// указываем адреса, на которые будут приходить заявки (лиды)
$emails = array(
     'xenon.akk@gmail.com',
);

// подготоваливаем служебную информацию
$time = date("j M Y (H:i:s)");
$headers = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: $h <echo@example.com>\r\n";

// составляем тему и текст письма
$subject = "$h - AVTOLIKE"; 
$message = " Страница: $page \r\n Форма: $h \r\n Имя: $n \r\n Телефон: $p \r\n Email: $e \r\n Время заказа: $time"; 

// из-за нерешенной проблемы с кодировкой пришлось сделать этот костыль

/*
$subject = iconv("UTF-8", "windows-1251", $subject);
$message = iconv("UTF-8", "windows-1251", " Страница: $page \r\n Форма: $h \r\n Имя: $n \r\n Телефон: $p \r\n Email: $e \r\n Время заказа: $time");
$headers = iconv("UTF-8", "windows-1251", $headers);
*/

// отправляем письмо всем адресатам
foreach ($emails as $to) {
     $a  = mail($to, $subject, $message);
     if ($a) echo 'good'; else echo 'bad';
}



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


function countConvert ($cookieID, $formH, $fieldN, $fieldP, $fieldE)
     {
     $t = time();
     $a = mysql_query ("INSERT INTO `multi_conv` (cookie_id, heading, name, phone, email, timestamp)
                                   VALUES ('$cookieID', '$formH', '$fieldN', '$fieldP', '$fieldE', '$t') "); 
     if ($a) echo "SUPER"; else echo "FULLSHIT";
     $b = mysql_query("UPDATE `multi_traffic` SET `conv`=`conv` + 1 WHERE id='$cookieID' ");
     if ($b) echo 'HAHA'; else echo 'NO';
     echo mysql_error();
     }
     
$n = iconv("UTF-8", "windows-1251", $n);
$h = iconv("UTF-8", "windows-1251", $h);
countConvert ($_COOKIE['avtolike_xenon'], $h, $n, $p, $e);


$n = iconv("windows-1251", "UTF-8", $n);
$h = iconv("windows-1251", "UTF-8", $h);

    $roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : "неизвестно";
    
    if ($n=="")  {$n="Без Имени";}
    if ($e=="")  {$e="";}
    
    $roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
    'key'     => 'NTYxMTo3MTUxOjFmYzc2ZjAyYzM1NmZhODFmNTNjNDkxZTM5NDhjNjlm', // Замените SECRET_KEY на секретный ключ из пункта меню Настройки -> Интеграция со сделками в нижней части экрана и строчке Ключ для интеграций
    'title'   => 'Заявка с service.avtolike.ru',
    'comment' => "Форма: ".$h. " Страница: ".$page,
    'name'    => $n,
    'email'   => $e,
    'phone'   => $p,
    'fields'  => array(
    // Массив дополнительных полей, если нужны, или просто пустой массив. Более подробно про работу доп. полей можно посмотреть в видео в начале статьи
    // Примеры использования:
       // "price" => 123, // Поле бюджет в amoCRM
        //"responsible_user_id" => 3, // Ответственный по сделке
         "tags" => "avtolike.ru",
         "1463631" => $roistatVisitId, // Заполнение доп. поля с ID 1463631
         "1468113" => "service.avtolike.ru"
    // Подробную информацию о наименовании полей и получить список доп. полей вы можете в документации amoCRM: https://developers.amocrm.ru/rest_api/#lead
    // Более подробную информацию по работе с дополнительными полями в amoCRM, вы можете получить у нашей службы поддержки
    ),
);
  
file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
    



?>
