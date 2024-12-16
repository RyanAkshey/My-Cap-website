<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate required POST data
    $required_fields = ['first_name', 'last_name', 'email', 'address', 'city', 'country', 'shipping_method', 'cart_data'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            die("Error: Missing $field.");
        }
    }

    // Collect POST data
    $first_name = $conn->real_escape_string($_POST['first_name']);
    $last_name = $conn->real_escape_string($_POST['last_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $country = $conn->real_escape_string($_POST['country']);
    $shipping_cost = (float)$_POST['shipping_method'];
    $cart_data = json_decode($_POST['cart_data'], true);

    if (!$cart_data) {
        die("Error: Invalid cart data.");
    }

    // Calculate total price
    $total_price = $shipping_cost;
    $items_list = "";

    foreach ($cart_data as $item) {
        $item_name = $conn->real_escape_string($item['name']);
        $item_price = (float)$item['price'];
        $item_quantity = (int)$item['quantity'];
        $total_price += $item_price * $item_quantity;
        $items_list .= "$item_name (x$item_quantity): ₱" . ($item_price * $item_quantity) . "\n";
    }

    // Insert data into the database
    $items_list_db = $conn->real_escape_string(json_encode($cart_data));
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

        // Redirect to index.html after 5 seconds
        echo '<script type="text/javascript">
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 5000); // Redirect after 5 seconds
              </script>';
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
