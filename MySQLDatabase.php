<?php

class MySQLDatabase
{
    private $host;
    private $username;
    private $password;
    private $database;
    private $connection;

    public function __construct($host, $username, $password, $database)
    {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

    public function connect()
    {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function disconnect()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }

    public function query($sql)
    {
        $result = $this->connection->query($sql);
        if (!$result) {
            die("Query failed: " . $this->connection->error);
        }
        return $result;
    }

    public function queryWithLike($table, $condition, $like)
    {
        $this->connect();

        $sql = "SELECT * FROM " . $this->escapeString($table) . " WHERE $condition LIKE '" . $this->escapeString($like) . "%'";
        $result = $this->query($sql);

        return $result;
    }

    public function escapeString($value)
    {
        return $this->connection->real_escape_string($value);
    }

    public function selectAll($table)
    {
        $sql = "SELECT * FROM " . $this->escapeString($table);
        return $this->query($sql);
    }
}
