<?php
$servername = "localhost";
$username = "root"; // default for local XAMPP/MAMP
$password = "";
$dbname = "electromart"; // your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
