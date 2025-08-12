<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['action']) and $_POST['action'] === 'subscribe') {
        $email = $_POST["email"];
        $subject = "Subject Subscribe Email"; // Replace your Subject Here
        $to = "recipient@example.com"; // Replace your Email Here
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-type: text/html\r\n";
        $message = "Subscribe Email " . $email; // Replace Your Message Subscribe

        $messageBody = "Email: $email<br>Message: $message";

        if (mail($to, $subject, $messageBody, $headers)) {
            echo "success"; // Send response Success
        } else {
            echo "error"; // Send Response Failed Send Mail
        }
    } elseif (isset($_POST['action']) and $_POST['action'] === 'appointment') {
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $date = $_POST["date"];
        $duration = $_POST["duration"];
        $studio = $_POST["studio"];
        $message = $_POST["message"];
        $subject = "Subject Subscribe Email"; // Replace your Subject Here
        $to = "recipient@example.com"; // Replace your Email Here
        $headers = "From: $name\r\n";
        $headers .= "Reply-To: $name\r\n";
        $headers .= "Content-type: text/html\r\n";
       

        $messageBody = "Name: $name<br>Message: $message";

        if (mail($to, $subject, $messageBody, $headers)) {
            echo "success"; // Send response Success
        } else {
            echo "error"; // Send Response Failed Send Mail
        }
    } else {
        $name = $_POST['name'];
        $email = $_POST["email"];
        $message = $_POST["message"];
        $phone = "Phone";
        $subject = "Subject Email"; // Replace your Subject Here

        $to = "recipient@example.com"; // Replace your Email Here
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-type: text/html\r\n";

        $messageBody = "Name: $name<br>Email: $email<br>Message: $message";

        if (mail($to, $subject, $messageBody, $headers)) {
            echo "success"; // Send response Success
        } else {
            echo "error"; // Send Response Failed Send Mail
        }
    }
}
