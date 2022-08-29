<?php

    require 'phpmailer.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = strip_tags(trim($_POST["firstName"]));
    $lastName = strip_tags(trim($_POST["lastName"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));

    if ( empty($firstName) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);
    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
    exit;
    }

    // PHPMailer Object
    $mail = new PHPMailer;
    $mail->CharSet = 'utf-8';

    // To address and name
    $mail->addAddress("david.kudela@bold-interactive.com", "David");
    
    $mail->SetFrom("david.kudela@bold-interactive.com", "Subject");
    $mail->AddReplyTo($email,$firstName.' '.$lastName);

    // Send HTML or Plain Text email
    $mail->isHTML(true);

    $mail->Subject = "Subject";
    $mail->Body = "Dobrý den,
    <br><br> ze stránek test byl odeslán následující formulář:<br><br>
    Jméno a příjmení: ".$firstName.' '.$lastName."<br>
    Email: ".$email."<br>
    Telefon: ".$phone;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Zpráva byla odeslána, děkujeme.';
    }

    } else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
    }


?>
