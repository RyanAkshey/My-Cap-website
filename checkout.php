<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
        exit;
    }

    // Extract data and sanitize
    $first_name = $conn->real_escape_string($data['first_name']);
    $last_name = $conn->real_escape_string($data['last_name']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);
    $city = $conn->real_escape_string($data['city']);
    $country = $conn->real_escape_string($data['country']);
    $shipping_method = (float)$data['shipping_method'];
    $cart_data = $data['cart_data'];

    $cart = json_decode($cart_data, true);
    if (!$cart) {
        echo json_encode(["status" => "error", "message" => "Invalid cart data."]);
        exit;
    }

    // Calculate subtotal
    $subtotal = 0;
    foreach ($cart as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }
    $total_price = $subtotal + $shipping_method;

    // Insert order into the database
    $cart_items = $conn->real_escape_string(json_encode($cart));
    $sql = "INSERT INTO orders (first_name, last_name, email, address, city, country, shipping_method, subtotal, total_price, order_date)
            VALUES ('$first_name', '$last_name', '$email', '$address', '$city', '$country', $shipping_method, $subtotal, $total_price, NOW())";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
