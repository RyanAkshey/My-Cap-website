<?php 
include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect POST data
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $country = $_POST['country'];
    $shipping_cost = (float)$_POST['shipping_method'];
    $cart_data = json_decode($_POST['cart_data'], true);

    // Calculate total price
    $total_price = $shipping_cost;
    $items_list = "";

    foreach ($cart_data as $item) {
        $total_price += $item['price'] * $item['quantity'];
        $items_list .= "{$item['name']} (x{$item['quantity']}): ₱" . ($item['price'] * $item['quantity']) . "\n";
    }

    // Insert data into database
    $items_list_db = json_encode($cart_data);
    $sql = "INSERT INTO orders (first_name, last_name, email, address, city, country, total_price, items)
            VALUES ('$first_name', '$last_name', '$email', '$address', '$city', '$country', '$total_price', '$items_list_db')";

    if ($conn->query($sql) === TRUE) {
        // Send email confirmation
        $to = $email;
        $subject = "Order Confirmation";
        $message = "
            <h2>Thank you for your order!</h2>
            <p>Hi $first_name $last_name,</p>
            <p>Your order details:</p>
            <pre>$items_list</pre>
            <p>Shipping Address: $address, $city, $country</p>
            <p>Total Price (including shipping): ₱" . number_format($total_price, 2) . "</p>
            <p>We will notify you when your order is shipped.</p>
        ";
        $headers = "From: no-reply@yourshop.com\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo "<h3>Order placed successfully! A confirmation email has been sent.</h3>";
        } else {
            echo "<h3>Order placed, but email failed to send.</h3>";
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
