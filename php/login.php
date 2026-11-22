
<?php
session_start();
require_once "db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($email === "" || $password === "") {
        $message = "Please fill in all fields.";
    } else {
        try {
            $stmt = $conn->prepare(
                "SELECT id, name, email, password
                 FROM users WHERE email = ?"
            );

            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify(
                $password,
                $user["password"]
            )) {
                session_regenerate_id(true);

                $_SESSION["user_id"] = $user["id"];
                $_SESSION["user_name"] = $user["name"];

                header("Location: ../home.html");
                exit;

            } else {
                $message = "Invalid email or password.";
            }

        } catch (PDOException $e) {
            error_log($e->getMessage());
            $message = "Login failed. Please try again.";
        }
    }
}
?>

<?php if ($message !== ""): ?>
    <p style="color: #925465; text-align: center;">
        <?php echo htmlspecialchars($message); ?>
    </p>
    <a href="../index.html">Back to Login</a>
<?php endif; ?>