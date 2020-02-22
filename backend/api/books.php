<?php
include_once './config/database.php';
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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
            getAllBooks($conn);
            break;
        case "POST":
            addNewBook($conn, $data);
            break;
        case "PUT":
            echo "its PUT";
            break;
        default:
            echo "ERROR: no request method";
    }
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
        $iban = $data->IBAN;

        $query = "INSERT INTO Books
                SET title = :title,
                    author = :author,
                    IBAN = :iban";
        
        $stmt = $conn->prepare($query);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':iban', $iban);

        if($stmt->execute()){

            http_response_code(200);
            echo json_encode(array("message" => "Books was successfully added."));
        }
        else{
            http_response_code(400);
        
            echo json_encode(array("message" => "Unable to add Book. IBAN needs to be unique"));
        }

       

    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}
?>