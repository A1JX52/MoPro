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
$sql = "SELECT DISTINCT thema, COUNT(thema) AS anzahl FROM st231958 GROUP BY thema";

$stmt = $pdo->query($sql);
$data = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}
$json = json_encode($data);
header('Content-Type: application/json');
echo $json;