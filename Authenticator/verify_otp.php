<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == "POST") {

    if (!isset($_SESSION['otp'])) {
        echo json_encode(["success" => false, "message" => "OTP session not set."]);
        exit;
    }

    $otp = $_SESSION['otp'];

    $package = file_get_contents("php://input");
    $contents = json_decode($package, true);

    if($otp == $contents['otp']) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

}