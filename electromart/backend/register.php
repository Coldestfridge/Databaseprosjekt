<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$address = $data['address'];

// Save into loginDetails
$sql1 = "INSERT INTO loginDetails (username, password) VALUES ('$username', '$password')";
if ($conn->query($sql1) === TRUE) {
    // Save into user table
    $sql2 = "INSERT INTO user (username, isPrivileged) VALUES ('$username', FALSE)";
    if ($conn->query($sql2) === TRUE) {
        $userID = $conn->insert_id; // Auto-increment userID
        
        // Save into userInfo table
        $sql3 = "INSERT INTO userInfo (userID, firstname, lastname, address) 
                 VALUES ('$userID', '$firstName', '$lastName', '$address')";
        if ($conn->query($sql3) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
