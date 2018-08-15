<?php

if(!isset($_SERVER['HTTP_REFERER'])){
    header('location:../index.html');
    exit;
}

$db_access_json = file_get_contents('../../config/db_read_access.json');
$db_access = json_decode($db_access_json);

$servername = $db_access->servername;
$username = $db_access->username;
$password = $db_access->password;
$dbname = $db_access->dbname;

$start = $_GET['start'];  // start index to select from
$count = $_GET['count'];  // amount of articles to select

if (is_numeric($start) && is_numeric($count)){

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Error occurred. Please try again later.");
    }

    //$sql = "SELECT id, title, text, authorId, dateCreated FROM neinews WHERE isActive = 1 order by dateCreated desc, id desc limit " .$start. ", " . $count;

    $sql = "SELECT 
	            neinews.id, title, images, text, authorId, dateCreated, neiauthors.name as authorName, neiauthors.avatar as authorAvatar, neiauthors.bio as authorBio
            FROM 
                neinews 
            INNER JOIN 
                neiauthors ON neiauthors.id = neinews.authorId
            WHERE neinews.isActive = 1
            order by neinews.dateCreated desc, neinews.id desc limit " .$start. ", " .$count;

    $result = mysqli_query($conn, $sql);

    $rows = array();
    while($r = $result -> fetch_assoc()) {
            $rows[] = $r;
    }
    echo json_encode($rows, JSON_HEX_APOS);
    mysqli_close($conn);
}
?>