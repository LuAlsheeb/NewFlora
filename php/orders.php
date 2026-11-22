<?php

session_start();
require_once "db.php";

$user_id = 1;
$total_price = $_GET['total'] ?? 0;
$status = "Pending";

try {

    $stmt = $conn->prepare(
        "INSERT INTO orders (user_id, total_price, status)
         VALUES (?, ?, ?)"
    );

    $stmt->execute([
        $user_id,
        $total_price,
        $status
    ]);

    echo "<h2>Order saved successfully</h2>";
//
   

} catch(PDOException $e) {

    echo $e->getMessage();

}
?>