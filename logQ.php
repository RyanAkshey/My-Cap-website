<?php 
include 'dbconn.php';


$username = $_POST["username"];
$password = $_POST["passwordLogin"];

 // Validate the input (you can add more validation as needed)
 if (empty($username) || empty($password)) {
    echo "Both fields are required.";
    exit;
}

// Optional: Hash the password before storing it (for security reasons)
// If you're storing passwords, it's better to use a hashed password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL query using a prepared statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");

// Bind the parameters to the prepared statement
$stmt->bind_param("ss", $username, $hashed_password); // "ss" means both are strings

// Execute the prepared statement and check for success
if ($stmt->execute()) {
    echo "New user created successfully.";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();

?>