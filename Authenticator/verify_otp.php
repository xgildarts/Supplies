<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");

if($_SERVER['REQUEST_METHOD'] == "POST") {

    $package = file_get_contents("php://input");
    $contents = json_decode($package, true);

    if($_SESSION['otp'] == $contents['otp']) {
        echo json_encode([true]);
    } else {
        echo json_encode([false]);
    }

}