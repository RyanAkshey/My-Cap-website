<?php

// Database connection
$servername = "localhost";
$username = "u143688490_shey";
$password = "Akshey15";
$dbname = "u143688490_Mycap_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>