<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $package = file_get_contents("php://input");
    $contents = json_decode($package, true);

    if($contents["request_name"] == "merchandise") {

        $url = "https://script.google.com/macros/s/AKfycbwLE_0KfK4IQNObmALU9GVBhCfVdAeN28QgOZypvwlZDlT8ozzAkIfj9lfbiQfYiJu5SA/exec?action=merchandise";
        $result = file_get_contents($url);
        echo $result;

    } else if($contents["request_name"] == "revenue_channel") {

        $revenue_channel = file_get_contents('https://script.google.com/macros/s/AKfycbwLE_0KfK4IQNObmALU9GVBhCfVdAeN28QgOZypvwlZDlT8ozzAkIfj9lfbiQfYiJu5SA/exec?action=revenue_channel');
        echo $revenue_channel; 

    } 

}