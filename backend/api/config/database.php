<?php
// used to get mysql database connection
class DatabaseService{

    //private $db_host = "mysql4316.cp.blacknight.com";
    private $db_host = "mysql4316int.cp.blacknight.com";
    private $db_name = "db1427163_almirtest";
    private $db_user = "u1427163_altest";
    private $db_password = "C9BK3lRA";
    private $connection;

    public function getConnection(){

        $this->connection = null;

        try{
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
        }catch(PDOException $exception){
            echo "Connection failed: " . $exception->getMessage();
        }

        return $this->connection;
    }
}
?>