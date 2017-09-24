<?php
class Cliente {
	var $clie_id;
	var $clie_rut;
	var $clie_nombre;
	var $clie_direccion;
	var $clie_ciudad;
	var $clie_fono;
	var $clie_mail;

	function __construct() {}

	function conexion() {
		$database = new db();
		$db = $database->conexion();

		return $db;
	}

	function listClientes() {
		$clientes = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_cln_id FROM inv_cliente WHERE 1";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);
		$stmt->execute();
		$stmt->bind_result($pid);

		while($stmt->fetch()) {
			array_push($clientes,$pid);
		}

		return $clientes;
	}

	function getCliente($id) {
		$cliente = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_cln_id, inv_cln_rut, inv_cln_nombre, inv_cln_direccion, inv_cln_ciudad, inv_cln_fono, inv_cln_mail
		FROM inv_cliente WHERE inv_cln_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->bind_result($pid, $prut, $pname, $pdir, $pciu, $pfono, $pmail);
		
		while($stmt->fetch()) {
			$this->clie_id = $pid;
			$this->clie_rut = $prut;
			$this->clie_nombre = $pname;
			$this->clie_direccion = $pdir;
			$this->clie_ciudad = $pciu;
			$this->clie_fono = $pfono;
			$this->clie_mail = $pmail;
		}
		
		$stmt->close();

		return $this;
	}

	function saveCliente($pid, $prut, $pname, $pdir, $pciu, $pfono, $pmail) {
		$mysqli = $this->conexion();

		$qry = "UPDATE inv_cliente SET 
		inv_cln_rut = ?,
		inv_cln_nombre = ?,
		inv_cln_direccion = ?,
		inv_cln_ciudad = ?,
		inv_cln_fono = ?,
		inv_cln_mail = ?
		WHERE inv_cln_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("ssssisi", $prut, $pname, $pdir, $pciu, $pfono, $pmail, $pid);
		$res = $stmt->execute();

		if($res == true)
		{
			$clie_id = $pid;
		}

		$stmt->close();

		return $clie_id;
	}

	function addCliente($prut, $pname, $pdir, $pciu, $pfono, $pmail) {
		$mysqli = $this->conexion();

		$qry = "INSERT INTO inv_cliente(inv_cln_rut, inv_cln_nombre, inv_cln_direccion, inv_cln_ciudad, inv_cln_fono, inv_cln_mail) VALUES(?,?,?,?,?,?)";

		$mysqli->set_charset("utf8");

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("ssssis", $prut, $pname, $pdir, $pciu, $pfono, $pmail);
		$stmt->execute();
		$cliente_id = $stmt->insert_id;

		$stmt->close();

		return $cliente_id;
	}

	function delCliente($id) {
		$mysqli = $this->conexion();

		$qry = "DELETE FROM inv_cliente WHERE inv_cln_id = ?";

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$filas = $stmt->affected_rows;

		$stmt->close();

		return $filas;
	}
}
?>