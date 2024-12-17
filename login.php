<?php 
header("Content-Type: application/json");
include 'dbconn.php';  // Connect to the database

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize the form input
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = $_POST["password"];

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Verify the password
        if (password_verify($password, $user["password"])) {
            // Start a session and store user details
            session_start();
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["name"];
            // Redirect to the user's profile/dashboard
            header("Location: profile.html");  // Modify with your actual user profile page
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "User not found.";
    }
}

$conn->close();
?>
