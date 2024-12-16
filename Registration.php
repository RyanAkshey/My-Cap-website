<?php 
include 'dbconn.php';  // Connect to the database

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);  // Hash the password

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
  
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful. <a href='userLog.html'>Login here</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
