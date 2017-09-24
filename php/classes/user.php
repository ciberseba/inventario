<?php
class user {

	var $user_id;
	var $username;

	function __construct() {
		$this->user_id = 0;
	}

	function conexion() {
		$database = new db();
		$db = $database->conexion();

		return $db;
	}

	function login($user, $pass) {
		$mysql = $this->conexion();

		$qry = "SELECT inv_user_id, inv_username FROM inv_usuario WHERE inv_username = ? AND inv_password = ?";

		$stmt = $mysql->prepare($qry);

		$stmt->bind_param("ss",$user,$pass);
		$stmt->execute();
		$stmt->bind_result($uid, $uname);

		while($stmt->fetch()) {
			$this->user_id = $uid;
			$this->username = $uname;
		}

		return $this;
	}
}
?>