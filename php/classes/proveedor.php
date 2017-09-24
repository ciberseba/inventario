<?php
class Proveedor {
	var $prov_id;
	var $prov_rut;
	var $prov_nombre;
	var $prov_direccion;
	var $prov_ciudad;
	var $prov_fono;
	var $prov_mail;

	function __construct() {}

	function conexion() {
		$database = new db();
		$db = $database->conexion();

		return $db;
	}

	function listProveedores() {
		$proveedores = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_prov_id FROM inv_proveedor WHERE 1";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);
		$stmt->execute();
		$stmt->bind_result($pid);

		while($stmt->fetch()) {
			array_push($proveedores,$pid);
		}

		return $proveedores;
	}

	function buscarProveedor($str_busq) {
		$proveedores = array();

		$mysqli = $this->conexion();

		$qry = "SELECT inv_prov_id FROM inv_proveedor WHERE inv_prov_rut LIKE ? OR inv_prov_nombre LIKE ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$str_busq = "%".$str_busq."%";

		$stmt->bind_param("ss", $str_busq, $str_busq);
		$stmt->execute();
		$stmt->bind_result($pid);

		while($stmt->fetch()) {
			array_push($proveedores,$pid);
		}

		return $proveedores;
	}

	function getProveedor($id) {
		$proveedor = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_prov_id, inv_prov_rut, inv_prov_nombre, inv_prov_direccion, inv_prov_ciudad, inv_prov_fono, inv_prov_mail
		FROM inv_proveedor WHERE inv_prov_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->bind_result($pid, $prut, $pname, $pdir, $pciu, $pfono, $pmail);
		
		while($stmt->fetch()) {
			$this->prov_id = $pid;
			$this->prov_rut = $prut;
			$this->prov_nombre = $pname;
			$this->prov_direccion = $pdir;
			$this->prov_ciudad = $pciu;
			$this->prov_fono = $pfono;
			$this->prov_mail = $pmail;
		}
		
		$stmt->close();

		return $this;
	}

	function saveProveedor($pid, $prut, $pname, $pdir, $pciu, $pfono, $pmail) {
		$mysqli = $this->conexion();

		$qry = "UPDATE inv_proveedor SET 
		inv_prov_rut = ?,
		inv_prov_nombre = ?,
		inv_prov_direccion = ?,
		inv_prov_ciudad = ?,
		inv_prov_fono = ?,
		inv_prov_mail = ?
		WHERE inv_prov_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("ssssisi", $prut, $pname, $pdir, $pciu, $pfono, $pmail, $pid);
		$res = $stmt->execute();

		if($res == true)
		{
			$prov_id = $pid;
		}

		$stmt->close();

		return $prov_id;
	}

	function addProveedor($prut, $pname, $pdir, $pciu, $pfono, $pmail) {
		$mysqli = $this->conexion();

		$qry = "INSERT INTO inv_proveedor(inv_prov_rut, inv_prov_nombre, inv_prov_direccion, inv_prov_ciudad, inv_prov_fono, inv_prov_mail) VALUES(?,?,?,?,?,?)";

		$mysqli->set_charset("utf8");

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("ssssis", $prut, $pname, $pdir, $pciu, $pfono, $pmail);
		$stmt->execute();
		$producto_id = $stmt->insert_id;

		$stmt->close();

		return $producto_id;
	}

	function delProveedor($id) {
		$mysqli = $this->conexion();

		$qry = "DELETE FROM inv_proveedor WHERE inv_prov_id = ?";

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$filas = $stmt->affected_rows;

		$stmt->close();

		return $filas;
	}
}
?>