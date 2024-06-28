<?php
$serverName = "localhost";
$userName = "root";
$password = "";

$conn = mysqli_connect($serverName, $userName, $password);

if ($conn) {
    // echo "Connection Successful <br>";
} else {
    // echo "Failed to connect".mysqli_connect_error();
}
?>
