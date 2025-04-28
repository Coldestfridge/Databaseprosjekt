<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$userID = $data['userID'];
$totalAmount = $data['totalAmount'];
$orderDate = date('Y-m-d');
$status = 'Processing';

$conn->begin_transaction();

// Insert into order table
$sql = "INSERT INTO `order` (userID, orderDate, totalAmount, status) 
        VALUES ('$userID', '$orderDate', '$totalAmount', '$status')";

if ($conn->query($sql) === TRUE) {
    $orderID = $conn->insert_id;

    foreach ($data['items'] as $item) {
        $productID = $item['productID'];
        $quantity = $item['quantity'];
        
        $sql2 = "INSERT INTO orderItem (orderID, productID, quantity)
                 VALUES ('$orderID', '$productID', '$quantity')";
        if (!$conn->query($sql2)) {
            $conn->rollback();
            echo json_encode(["success" => false, "error" => $conn->error]);
            exit();
        }
    }

    $conn->commit();
    echo json_encode(["success" => true, "orderID" => $orderID]);
} else {
    $conn->rollback();
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
