<?php 
    include 'dbconn.php';

    
// Handle login
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = $_POST["email"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM users WHERE email='$email'";
  $result = $conn->query($sql);

  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
      session_start();
      $_SESSION["user_id"] = $user["id"];
      $_SESSION["user_name"] = $user["name"];
      header("Location: profile.php");
    } else {
      echo "Invalid password.";
    }
  } else {
    echo "User not found.";
  }
}

$conn->close();
?>