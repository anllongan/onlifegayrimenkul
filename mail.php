<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$mailheader = "From:".$name."<".$email.">\r\n";

$recipient = "info@anilongan.com";

mail($recipient, $subject, $message, $mailheader) or die("Error!");

echo'

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact form</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins&display=swap"
        rel="stylesheet">
    <style>
        html {
            background-color: rgb(0, 0, 0);
        }

        .message {
            display: flex;
            margin: auto;
            padding: 10px;
            background-color: rgb(212, 210, 209);
            width: 600px;
            height: auto;
        }


        .message .container {
            text-align: center;
        }

        .message .container h1 {
            font-size: 40px;
            color: black;
        }

        .message .container p {
            font-size: 20px;
            color: black;
        }

        .message .container a{
            color: red;

        }
    </style>
</head>

<body>
    <section class="message">
        <div class="container">
            <h1>Teşekkür Ederiz.<span> En kısa sürede size dönüş yapmış olucaz!</span> </h1>
            <p class="back">Anasayfaya dön. <a href="index.html">Anasayfa</a>.</p>
        </div>
    </section>

</body>

</html>


';


?>