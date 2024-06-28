<?php
include 'connection.php';

// Create main database if not exists
function createMainDatabase($conn, $database)
{
    $query = "CREATE DATABASE IF NOT EXISTS $database";
    if (mysqli_query($conn, $query)) {
        // echo "Database Created or already Exists <br>";
    } else {
        // echo "Failed to create database <br>" . mysqli_connect_error();
    }
}

// Create main table if not exists
function createMainTable($conn, $table)
{
    $query = "CREATE TABLE IF NOT EXISTS $table (
        city VARCHAR (250),
        weather_icon VARCHAR(250),
        weather_condition VARCHAR(250),
        weather_description VARCHAR(250),
        humidity FLOAT NOT NULL,
        temperature FLOAT NOT NULL,
        pressure FLOAT NOT NULL,
        wind_speed FLOAT NOT NULL,
        wind_direction FLOAT NOT NULL,
        background_image VARCHAR(250),
        date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );";

    if (mysqli_query($conn, $query)) {
        //    echo "Table Created or already Exists <br>";
    } else {
        //    echo "Failed to create database <br>" . mysqli_connect_error();
    }
}

// Get cityname from url param
function getCityNameFromUrlParam()
{
    if (isset($_GET['q'])) {
        return $_GET['q'];
    }
    return "Colchester";
}

// Get background image based on weather id
function getBackgroundImage($weatherId)
{
    $url = "https://i.gifer.com/g1vA.gif"; // default
    if ($weatherId >= 200 && $weatherId <= 232) {
        $url = "https://i.gifer.com/8nKy.gif"; // thunderstorm weather
    } else if ($weatherId >= 300 && $weatherId <= 321) {
        $url = "https://i.gifer.com/IxI.gif"; // drizzle weather
    } else if ($weatherId >= 500 && $weatherId <= 531) {
        $url = "https://i.gifer.com/73j6.gif"; // rain weather
    } else if ($weatherId >= 600 && $weatherId <= 622) {
        $url = "https://i.gifer.com/YWuH.gif"; //snow weather
    } else if ($weatherId >= 701 && $weatherId <= 781) {
        $url = "https://i.gifer.com/8AC8.gif"; // atmosphere weather
    } else if ($weatherId >= 801 && $weatherId <= 804) {
        $url = "https://i.gifer.com/srG.gif"; // clouds weather
    } else if ($weatherId === 800) {
        $url = "https://i.gifer.com/Lx0q.gif"; //clear weather
    }
    return $url;
}


// Fetch data from weather api and insert into main table
function insertDataFetchedFromWeatherApi($conn, $city)
{
    $apiKey = "628770553edec8791fd2881b449223d4&";
    $url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" . $city . "&apikey=" . $apiKey;
    
    $response = @file_get_contents($url);
    if($response != false){
        $data = json_decode($response, true);
        $icon = $data['weather'][0]['icon'];
        $condition = $data['weather'][0]['main'];
        $description = $data['weather'][0]['description'];
        $city = $data['name'];
        $humidity = $data['main']['humidity'];
        $temperature = $data['main']['temp'];
        $pressure = $data['main']['pressure'];
        $wind_speed = $data['wind']['speed'];
        $wind_direction = $data['wind']['deg'];
        $icon_url = "https://openweathermap.org/img/wn/" . $icon . "@2x.png";
        $background_image = getBackgroundImage($data['weather'][0]['id']);
        $insertData = "INSERT INTO weather (weather_icon, weather_condition, weather_description, city, humidity, temperature, pressure, wind_speed, wind_direction, background_image) 
                VALUES ('$icon_url', '$condition', '$description', '$city', '$humidity', '$temperature', '$pressure', '$wind_speed', '$wind_direction', '$background_image')";
        if (mysqli_query($conn, $insertData)) {
            // echo "Data inserted Successfully";
        } else {
            // echo "Failed to insert data" . mysqli_error($conn);
        }    
    }
   
}

// Send response data
function sendResponseData($conn, $table, $city)
{
    $selectAllData = "SELECT * FROM $table WHERE city = '$city' ORDER BY date_time DESC ";
    $result = mysqli_query($conn, $selectAllData);

    // If data is not found, fetch data from weather api and store into our system
    if (mysqli_num_rows($result) == 0) {
        insertDataFetchedFromWeatherApi($conn, $city);
    } else {
        date_default_timezone_set('Asia/Kathmandu');
        $row = mysqli_fetch_assoc($result);
        $latest_date_time = strtotime($row['date_time']);
        $current_time = time();
        $time_limit = 7200; // 2 hours = 7200 seconds

        // If data is more than 2 hours old, refetch data from weather api and store into our system
        if ($current_time - $latest_date_time > $time_limit) {
            insertDataFetchedFromWeatherApi($conn, $city);
        }
    }

    $rows = [];

    // Fetch data from main table based on city name again after insertion
    $result = mysqli_query($conn, $selectAllData);
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    
    header('Content-Type: application/json');

    // Convert fetched data to JSON and send as response
    if($rows != null){
        $json_data = json_encode($rows);
        echo $json_data;
    }
    else {
        header("HTTP/1.0 404 Not Found");
        echo '[]';
    }
}

// Main
function main($conn)
{
    $main_database = "prototype3";
    $main_table = "weather";
    $city = getCityNameFromUrlParam();

    // Create main database if not exists
    createMainDatabase($conn, $main_database);

    // Use created database
    mysqli_select_db($conn, $main_database);

    // Create main table if not exists
    createMainTable($conn, $main_table);

    // Send response data
    sendResponseData($conn, $main_table, $city);

    // Close connection
    mysqli_close($conn);
}

main($conn);
?>

