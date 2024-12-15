<?php
// Include database connection
include 'dbconn.php'; // Ensure the path to dbconn.php is correct

// Get data from form (assumes form uses POST method)
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"]; // You should hash the password before inserting it

// Prepare the SQL query using a prepared statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

// Bind parameters to the prepared statement
$stmt->bind_param("sss", $username, $email, $password); // "sss" indicates three strings

// Execute the prepared statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and connection
$stmt->close();
$conn->close();
?>
