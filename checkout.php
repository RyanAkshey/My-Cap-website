<?php
header("Content-Type: application/json");
include 'dbconn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON input."]);
        exit;
    }

    $first_name = $conn->real_escape_string($data['first_name']);
    $last_name = $conn->real_escape_string($data['last_name']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);
    $city = $conn->real_escape_string($data['city']);
    $country = $conn->real_escape_string($data['country']);
    $shipping_method = floatval($data['shipping_method']);
    $cart = json_decode($data['cart_data'], true);

    if (!$cart) {
        echo json_encode(["status" => "error", "message" => "Invalid cart data."]);
        exit;
    }

    $subtotal = 0;
    foreach ($cart as $item) {
        $subtotal += $item['price'] * $item['quantity'];
    }
    $total_price = $subtotal + $shipping_method;

    $cart_items = $conn->real_escape_string(json_encode($cart));

    $sql = "INSERT INTO orders (first_name, last_name, email, address, city, country, shipping_method, subtotal, total_price, cart_items, order_date) 
            VALUES ('$first_name', '$last_name', '$email', '$address', '$city', '$country', $shipping_method, $subtotal, $total_price, '$cart_items', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
