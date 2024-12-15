<?php
// Include database connection
include 'dbconn.php'; // Ensure the path to dbconn.php is correct

// Get data from form (assumes form uses POST method)
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"]; // You should hash the password before inserting it

// Optional: Hash the password before inserting (for security reasons)
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL query using a prepared statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

// Bind parameters to the prepared statement
$stmt->bind_param("sss", $username, $email, $hashed_password); // "sss" indicates three strings

// Execute the prepared statement
if ($stmt->execute()) {
    // Redirect to log.html after successful registration
    header("Location: log.html"); 
    exit;  // Make sure to call exit after header to stop script execution
} else {
    // Echo error message if registration fails
    echo "Error: " . $stmt->error;
}

// Close the prepared statement and connection
$stmt->close();
$conn->close();
?>
