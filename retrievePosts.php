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
$thema = $_GET['thema'];

$sql = "SELECT zeitpunkt, nutzer, text FROM st231958 WHERE thema='$thema'";

$stmt = $pdo->query($sql);
$data = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}
$json = json_encode($data);
header('Content-Type: application/json');
echo $json;