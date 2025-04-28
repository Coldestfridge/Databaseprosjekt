<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$sql = "SELECT loginDetails.password, user.userID, userInfo.firstname, userInfo.lastname, userInfo.address 
        FROM loginDetails
        JOIN user ON loginDetails.username = user.username
        JOIN userInfo ON user.userID = userInfo.userID
        WHERE loginDetails.username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        echo json_encode([
            "success" => true,
            "user" => [
                "userID" => $row['userID'],
                "username" => $username,
                "firstName" => $row['firstname'],
                "lastName" => $row['lastname'],
                "address" => $row['address']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Username not found"]);
}

$conn->close();
?>
