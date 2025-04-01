<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: POST, GET");

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        include("database.php");

        $package = file_get_contents("php://input");

        $contents = json_decode($package, true);

        $username = htmlspecialchars($contents["email"]);
        $password = htmlspecialchars($contents["password"]);

        $sql = "INSERT INTO login_information (username, password)
        VALUES (?, ?);";


        $ps = $conn->prepare($sql);

        $ps->bind_param("ss", $username, $password);

        if($ps->execute()) {

            echo json_encode(["Successfully inserted!"]);
            $ps->close();

        } else {
            echo json_encode(["Error inserting!"]);
        }
        
        


    } else if($_SERVER["REQUEST_METHOD"] == "GET") {

        include("database.php");

        $sql = "SELECT username, password FROM login_information;";

        $credentials = [];

        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0) {

            while($data = mysqli_fetch_assoc($result)) {
                array_push($credentials, $data["username"], $data["password"]);
            }

        }

        echo json_encode($credentials);

    }

?>