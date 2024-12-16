<?php 
    include 'dbconn.php';


// 2. Collect POST data
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$address = $_POST['address'];
$city = $_POST['city'];
$shipping_method = $_POST['shipping_method'];
$subtotal = $_POST['subtotal'];

// 3. Insert data into database
$sql = "INSERT INTO orders (first_name, last_name, email, address, city, shipping_method, subtotal)
        VALUES ('$first_name', '$last_name', '$email', '$address', '$city', '$shipping_method', '$subtotal')";

if ($conn->query($sql) === TRUE) {
    // 4. Send email confirmation
    $to = $email;
    $subject = "Order Confirmation";
    $message = "
        <h2>Thank you for your order!</h2>
        <p>Hi $first_name $last_name,</p>
        <p>Your order details:</p>
        <ul>
            <li>Address: $address, $city</li>
            <li>Shipping Method: $shipping_method</li>
            <li>Subtotal: ₱$subtotal</li>
        </ul>
        <p>We will notify you once your order is shipped.</p>
    ";
    $headers = "From: no-reply@yourshop.com\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Order placed successfully! A confirmation email has been sent.";
    } else {
        echo "Order placed, but email failed to send.";
    }
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>