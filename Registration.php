<?php
include 'dbconn.php';  // Connect to the database

// Set JSON content type
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if all required fields are present
    if (isset($_POST["userName"], $_POST["email"], $_POST["password"])) {
        
        // Sanitize input and hash the password
        $userName = trim($_POST["userName"]);
        $email = trim($_POST["email"]);
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);  // Hash the password

        // Use a prepared statement to insert data
        $stmt = $conn->prepare("INSERT INTO userReg (userName, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $userName, $email, $password);

        if ($stmt->execute()) {
            // Successful registration response
            echo json_encode(["status" => "success", "message" => "Registration successful"]);
        } else {
            // Database error response
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        $stmt->close();  // Close statement
    } else {
        // Missing input fields response
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    }
} else {
    // Invalid request method response
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();  // Close database connection
?>
