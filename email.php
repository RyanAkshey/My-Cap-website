<?php
// Load the PHPMailer classes
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email address the user entered
    $userEmail = $_POST['email'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = '';  // Your Gmail address
        $mail->Password = 'wgmz puny oqll xayy';     // Your Gmail app password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('mycapstore@gmail.com', 'MyCap Store');  // Your email and name as the sender
        $mail->addAddress($userEmail);  // Send email to the user-entered email

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'title';
        $mail->Body    = 'content';
        
        // Send the email
        $mail->send();
        echo 'A confirmation email has been sent to ' . htmlspecialchars($userEmail);
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>