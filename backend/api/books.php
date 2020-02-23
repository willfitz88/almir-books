<?php
include_once './config/database.php';
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$secret_key = "almir_secret";
$jwt = null;
$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$data = json_decode(file_get_contents("php://input"));


//echo $data->title;
$requestMethod = $_SERVER['REQUEST_METHOD'];

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
$arr = explode(" ", $authHeader);
$jwt = $arr[1];


if($jwt){
    switch ($requestMethod) {
        case "GET":
            if($_GET['id']) {
                getBookById($conn, $_GET['id']);
            }
            else{
                getAllBooks($conn);
            }
            break;
        case "POST":
            addNewBook($conn, $data);
            break;
        case "PUT":
            updateBook($conn, $_GET['id'], $data);
            break;
        case "DELETE":
            deleteBook($conn, $_GET['id']);
            break;
        default:
            echo "ERROR: no request method";
    }
}
else{
    // no valid JWT
    //http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}


function getAllBooks($conn) {
    
    try {

        //$decoded = JWT::decode($jwt, $secret_key, array('HS256'));
        // Access is granted. Add code of the operation here

        $query = "SELECT * FROM Books";

        $stmt = $conn->prepare( $query );
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num>0){

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($results);
        
            // set response code - 200 OK
            http_response_code(200);
        }
        else {
            echo json_encode(array(
                "message" => "No records found"
            ));
        }
        

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}


function addNewBook($conn, $data) {
    
    try {

        $title = $data->title;
        $author = $data->author;
        $isbn = $data->ISBN;

        $query = "INSERT INTO Books
                SET title = :title,
                    author = :author,
                    ISBN = :isbn";
        
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':isbn', $isbn);

        if($stmt->execute()){

            http_response_code(200);
            echo json_encode(array("message" => "Books was successfully added."));
        }
        else{
            http_response_code(400);
        
            echo json_encode(array("message" => "Unable to add Book. ISBN needs to be unique"));
        }

       

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}


function updateBook($conn, $id, $data) {
    
    try {

        $title = $data->title;
        $author = $data->author;
        $isbn = $data->ISBN;

        $query = "UPDATE Books
                SET title = :title,
                    author = :author,
                    ISBN = :isbn
                WHERE ID = :id";
        
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':isbn', $isbn);
        $stmt->bindParam(':id', $id);

        if($stmt->execute()){

            http_response_code(200);
            echo json_encode(array("message" => "Books was successfully added."));
        }
        else{
            http_response_code(400);
        
            echo json_encode(array("message" => "Unable to add Book. ISBN needs to be unique"));
        }

       

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}


function getBookById($conn, $id) {
    
    try {

        $query = "SELECT * FROM `Books` WHERE `ID` =".$id." LIMIT 1";
        
        $stmt = $conn->prepare($query);

        $stmt->execute();

        $num = $stmt->rowCount();

        if($num>0){

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($results);
        
            // set response code - 200 OK
            http_response_code(200);
        }
        else {
            echo json_encode(array(
                "message" => "No record found for id:".$id
            ));

            //http_response_code(204);
        }

       

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}


function deleteBook($conn, $id) {

    // TODO: handle query where id does not exist

    $query = "DELETE FROM `Books` WHERE `ID` ='{$id}' LIMIT 1";
    $stmt = $conn->prepare($query);

    if($stmt->execute()){

        http_response_code(200);
        echo json_encode(array("message" => "Books was successfully deleted."));
    }
    else{
        http_response_code(400);
    
        echo json_encode(array("message" => "Unable to delete book"));
    }
}

?>