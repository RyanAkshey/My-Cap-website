<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        die("Error: Invalid input data.");
    }

    // Validate required data
    $required_fields = ['first_name', 'last_name', 'email', 'address', 'city', 'country', 'shipping_method', 'cart_data'];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            die("Error: Missing $field.");
        }
    }

    // Collect and sanitize data
    $first_name = $conn->real_escape_string($data['first_name']);
    $last_name = $conn->real_escape_string($data['last_name']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);
    $city = $conn->real_escape_string($data['city']);
    $country = $conn->real_escape_string($data['country']);
    $shipping_cost = (float)$data['shipping_method'];
    $cart_data = json_decode($data['cart_data'], true);

    if (!$cart_data) {
        die("Error: Invalid cart data.");
    }

    // Calculate total price
    $total_price = $shipping_cost;
    foreach ($cart_data as $item) {
        $total_price += $item['price'] * $item['quantity'];
    }

    // Insert order into database
    $sql = "INSERT INTO orders (first_name, last_name, email, address, city, country, shipping_method, subtotal, order_date)
            VALUES ('$first_name', '$last_name', '$email', '$address', '$city', '$country', '$shipping_cost', '$total_price', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "Order placed successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
