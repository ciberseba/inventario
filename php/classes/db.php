<?php
class db {
	
	function conexion() {

		$host = "localhost";
		$username = "facilsof_user";
		$password = "f4c1ls0ft";
		$database = "facilsof_inventario";

		$mysqli = new mysqli($host, $username, $password, $database);

		return $mysqli;
	}
}
?>