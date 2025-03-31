<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");


$package = file_get_contents("php://input");

$contents = json_decode($package, true);



$file = fopen("test.txt", "a"); // Open file in append mode
fwrite($file, "{$contents['key']}\n");
fclose($file);


echo json_encode(["Work"]);