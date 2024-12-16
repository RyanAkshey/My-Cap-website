<?php 
    include 'dbconn.php';

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
      
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
      
        if ($conn->query($sql) === TRUE) {
          echo "Registration successful. <a href='userLog.html'>Login here</a>";
        } else {
          echo "Error: " . $conn->error;
        }
      }
      
      $conn->close();
      ?>
?>