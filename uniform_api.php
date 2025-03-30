<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");


if($_SERVER["REQUEST_METHOD"] == "POST") {

    $package = file_get_contents("php://input");

    $contents = json_decode($package, true);

    if($contents["request_name"] == "uniforms") {

        $uniforms = file_get_contents('https://script.google.com/macros/s/AKfycbzcHUH14SQ9XzXdBQj03MmGZw7zj6QrS9n-3RFie_2UOC1DFTGVAxhEiYxXzFoX_C0WPg/exec?action=uniforms');
        echo $uniforms;

    } else if($contents["request_name"] == "sizes") {

        $sizes = file_get_contents('https://script.google.com/macros/s/AKfycbzcHUH14SQ9XzXdBQj03MmGZw7zj6QrS9n-3RFie_2UOC1DFTGVAxhEiYxXzFoX_C0WPg/exec?action=sizes');
        echo $sizes; 
        
    } else if($contents["request_name"] == "comparing") {

        $items = file_get_contents('https://script.google.com/macros/s/AKfycbzcHUH14SQ9XzXdBQj03MmGZw7zj6QrS9n-3RFie_2UOC1DFTGVAxhEiYxXzFoX_C0WPg/exec?action=comparing');
        echo $items; 

    } else if($contents["request_name"] == "insert") {

        $url = "https://script.google.com/macros/s/AKfycbz2OwJ9JzyJ0MNf4Fj0p3JoOzFwwsY6CqtEiq6wnMydFmgbidLDZNFrjd88qzN0OhzgvA/exec";

        $options = [
            "http" => [
                "method" => "POST",
                "header" => "Content-Type: application/json",
                "content" => $package,
                "ignore_errors" => true
            ]
        ];

        $context = stream_context_create($options);

        $response = file_get_contents($url, false, $context);

        echo json_encode(["Succesfully insert new data!"]);

    } else if($contents["request_name"] == "revenue_channel") {

        $revenue_channel = file_get_contents('https://script.google.com/macros/s/AKfycbzcHUH14SQ9XzXdBQj03MmGZw7zj6QrS9n-3RFie_2UOC1DFTGVAxhEiYxXzFoX_C0WPg/exec?action=revenue_channel');
        echo $revenue_channel; 

    }

    
}