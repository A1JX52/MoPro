<?php
// header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'forum';
$username = 'postgres';
$password = 'postgres';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
$nutzer = $_POST['nutzer'];
$thema = $_POST['thema'];
$text = $_POST['text'];

$sql = "INSERT INTO st231958 (nutzer, thema, text) VALUES (:nutzer, :thema, :text)";

$stmt = $pdo->prepare($sql);
$stmt->bindParam(':nutzer', $nutzer);
$stmt->bindParam(':thema', $thema);
$stmt->bindParam(':text', $text);

if ($stmt->execute()) {
    echo "Sended data: $nutzer, $thema, $text";
} else {
    echo "Send failed.";
}