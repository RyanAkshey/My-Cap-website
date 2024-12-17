<?php 
header("Content-Type: application/json");
include 'dbconn.php';  // Connect to the database

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate the form data
    $name = mysqli_real_escape_string($conn, $_POST["userName"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);  // Hash the password

    // Insert the user data into the database
    $sql = "INSERT INTO users (userName, email, password) VALUES ('$userName', '$email', '$password')";
  
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful. <a href='userLog.html'>Login here</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
