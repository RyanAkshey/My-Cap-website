<?php
// Include database connection
include 'dbconn.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the data from the form
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate the input
    if (empty($username) || empty($password)) {
        echo "Both fields are required.";
        exit;
    }

    // Prepare the SQL query to retrieve the user record
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    
    // Bind the parameter to the prepared statement
    $stmt->bind_param("s", $username); // "s" means the parameter is a string

    // Execute the prepared statement
    $stmt->execute();

    // Bind the result to a variable
    $stmt->bind_result($hashed_password_from_db);

    // Check if the user exists
    if ($stmt->fetch()) {
        // Verify the password
        if (password_verify($password, $hashed_password_from_db)) {
            // Successful login - redirect to index.html
            header("Location: index.html");
            exit;  // Make sure to call exit after the header to stop further script execution
        } else {
            // Invalid password
            echo "Invalid password.";
        }
    } else {
        // Username does not exist
        echo "No user found with that username.";
    }

    // Close the prepared statement and connection
    $stmt->close();
    $conn->close();
}
?>
