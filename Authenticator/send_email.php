<?php


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: POST, GET");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';
    $mail = new PHPMailer(true);

    try {

        include("../database.php");

        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "centerstudentsuccess94@gmail.com";
        $mail->Password = "ioiqmuylcwjueoel";
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom("centerstudentsuccess94@gmail.com", "Password recover");
        $mail->addAddress("xnatsu25@gmail.com");
        $mail->Subject = "Password recovered!";

        $sql = "SELECT username, password FROM login_information;";
        $credentials = [];
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0) {

            while($data = mysqli_fetch_assoc($result)) {
                array_push($credentials, $data["username"], $data["password"]);
            }

        }
        $mail->Body = "Username: {$credentials[0]}\nPassword: {$credentials[1]}";
        $mail->send();
        echo json_encode([true]);

    } catch(Exception $e) {
        echo json_encode(["Error". $e->errorMessage()]);
    }