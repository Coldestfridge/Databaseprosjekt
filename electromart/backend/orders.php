<?php
include 'db.php';

$userID = $_GET['userID'];

$sql = "SELECT o.*, oi.productID, oi.quantity, p.name AS productName
        FROM `order` o
        JOIN orderItem oi ON o.orderID = oi.orderID
        JOIN product p ON oi.productID = p.productID
        WHERE o.userID = '$userID'
        ORDER BY o.orderDate DESC";

$result = $conn->query($sql);

$orders = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode($orders);

$conn->close();
?>
