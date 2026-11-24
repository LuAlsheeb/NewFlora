<?php
require_once "db.php";

$stmt = $conn->query("SELECT * FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Products</title>
</head>
<body>

<h2>Products</h2>

<?php foreach($products as $product){ ?>

<div style="border:1px solid #ccc;padding:10px;margin:10px;">

    <img src="<?php echo $product['image']; ?>" width="150">

    <h3><?php echo $product['name']; ?></h3>

    <p>
        Price:
        <?php echo $product['price']; ?> SAR
    </p>

</div>

<?php } ?>

</body>
</html>