<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {

    $otp = rand(100000, 999999);
    $_SESSION['otp'] = $otp;

    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "centerstudentsuccess94@gmail.com";
    $mail->Password = "ioiqmuylcwjueoel";
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom("centerstudentsuccess94@gmail.com", "Your Verification Code");
    $mail->addAddress("xnatsu25@gmail.com");
    $mail->Subject = "Verification Code";
    $mail->Body = $otp;
    $mail->send();
    echo json_encode(['Verification code successfully sent!']);

} catch(Exception $e) {

    echo "Error: {$mail->ErrorInfo}";

}
