<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $package = file_get_contents("php://input");

    $contents = json_decode($package, true);

    if($contents["request_name"] == "uniforms") {

        $uniforms = file_get_contents('https://script.google.com/macros/s/AKfycbwjzk6QOxxt6PQcRpJChRX0LscKddSu74eortHECktDD8aaja_Y0sOVGBMIR0PBCCqg/exec?action=uniforms');
        echo $uniforms;

    } else if($contents["request_name"] == "sizes") {

        $uniforms = file_get_contents('https://script.google.com/macros/s/AKfycbwjzk6QOxxt6PQcRpJChRX0LscKddSu74eortHECktDD8aaja_Y0sOVGBMIR0PBCCqg/exec?action=sizes');
        echo $uniforms; 
        
    } else if($contents["request_name"] == "comparing") {

        $uniforms = file_get_contents('https://script.google.com/macros/s/AKfycbwjzk6QOxxt6PQcRpJChRX0LscKddSu74eortHECktDD8aaja_Y0sOVGBMIR0PBCCqg/exec?action=comparing');
        echo $uniforms; 

    }

    
}