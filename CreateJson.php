<?php

require_once 'MySQLDatabase.php';

$host = "localhost";
$username = "root";
$password = "";
$database = "wetterdaten";
$tableName = "daten";

$databaseConnection = new MySQLDatabase($host, $username, $password, $database);

$todayDate = date('Y-m-d');

$result = $databaseConnection->queryWithLike($tableName, "time_stamp", $todayDate);

$allRows = [];
while ($row = $result->fetch_assoc()) {
    $weatherRow = (object) [
        'Humidity' => $row["Humidity"],
        'Pressure' => $row["Pressure"],
        'Altitude' => $row["Altitude"],
        'Temperature' => $row["Temperature"],
        'time_stamp' => $row["time_stamp"],
    ];

    $allRows[] = $weatherRow;
}

$uniqueRows = array_values(array_unique(array_column($allRows, 'time_stamp')));
$filteredRows = array_filter($allRows, function ($row) use ($uniqueRows) {
    return in_array($row->time_stamp, $uniqueRows);
});

$filename = "weatherData" . $todayDate . ".json";
$filteredRowsJSON = json_encode($filteredRows, JSON_PRETTY_PRINT);
file_put_contents($filename, $filteredRowsJSON);

$databaseConnection->disconnect();

$folderPath = __DIR__;
$outputFile = 'mergedData.json';

function mergeAndRemoveDuplicates($folderPath, $outputFile)
{
    $files = glob("$folderPath/*.json");

    $mergedData = [];

    foreach ($files as $file) {
        $fileData = file_get_contents($file);
        $jsonData = json_decode($fileData);

        if ($jsonData !== null) {
            $mergedData = array_merge($mergedData, $jsonData);
        }
    }

    $mergedData = array_values(array_unique(array_map('json_encode', $mergedData)));
    $mergedData = array_map('json_decode', $mergedData, array_fill(0, count($mergedData), true));

    file_put_contents($outputFile, json_encode($mergedData, JSON_PRETTY_PRINT));
}

mergeAndRemoveDuplicates($folderPath, $outputFile);
