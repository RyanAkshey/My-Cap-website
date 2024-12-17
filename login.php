<?php 
header("Content-Type: application/json");
include 'dbconn.php';  // Connect to the database

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize the form input
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = $_POST["password"];

    // Check if the user exists in the database
    $sql = "SELECT * FROM userReg WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Verify the password
        if (password_verify($password, $user["password"])) {
            // Start a session and store user details
            session_start();
            $_SESSION["user_id"] = $user["id"];       // Assuming you have an 'id' column
            $_SESSION["user_name"] = $user["userName"];  // Correct column for username

            // Return success response
            echo json_encode(["status" => "success", "message" => "Login successful."]);
            exit();
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }
}

$conn->close();
?>
