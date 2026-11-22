<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "newflora_db";

try {
    $conn = new PDO(
        "mysql:host=$host;dbname=$database;charset=utf8mb4",
        $username,
        $password
    );

    $conn->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {
    error_log($e->getMessage());
    die("Database connection failed.");
}
?>