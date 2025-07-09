<?php

$host = 'localhost';
$dbName = 'bmi_db';
$username = 'root';
$password = '';
$conn = new mysqli($host, $username, $password, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$height = $_POST['height'];
$weight = $_POST['weight'];
$bmi    = $_POST['bmi'];
$status = $_POST['status'];
$sql = "INSERT INTO bmi_records (height_cm, weight_kg, bmi_value, status)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ddds", $height, $weight, $bmi, $status);

if ($stmt->execute()) {
    echo "BMI record saved successfully!";
} else {
    echo "Error saving record: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
