<?php
include 'db.php';

$sql = "SELECT p.*, b.name AS brandName, c.name AS categoryName
        FROM product p
        JOIN brand b ON p.brandID = b.brandID
        JOIN category c ON p.categoryID = c.categoryID";

$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$conn->close();
?>
