<?php
class Producto {
	
	var $prod_nombre;
	var $prod_descripcion;
	var $prod_id;
	var $prod_unidad;
	var $prod_base_unidad;
	var $prod_prec_compra;
	var $prod_prec_venta;

	function __construct(){
		
	}	

	function conexion() {
		$database = new db();
		$db = $database->conexion();

		return $db;
	}

	function getProductos() {
		$productos = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_prod_id FROM inv_producto WHERE 1";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);
		$stmt->execute();
		$stmt->bind_result($pid);

		while($stmt->fetch()) {
			array_push($productos,$pid);
		}

		return $productos;
	}

	function buscarProducto($strBusq) {
		$productos = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_prod_id FROM inv_producto WHERE inv_prod_nombre LIKE ?";

		$strBusq = "%".$strBusq."%";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("s",$strBusq);
		$stmt->execute();
		$stmt->bind_result($pid);

		while($stmt->fetch()) {
			array_push($productos,$pid);
		}

		return $productos;
	}

	function getProducto($id) {
		$producto = array();
		$mysqli = $this->conexion();

		$qry = "SELECT inv_prod_id, inv_prod_nombre, inv_prod_descripcion, inv_prod_unidad, inv_prod_base_unidad, inv_prod_prec_vta, inv_prod_prec_cmp FROM inv_producto WHERE inv_prod_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$stmt->bind_result($pid, $pname, $pdesc, $pund, $pbund, $pvta, $pcmp);
		
		while($stmt->fetch()) {
			$this->prod_id = $pid;
			$this->prod_nombre = $pname;
			$this->prod_descripcion = $pdesc;
			$this->prod_unidad = $pund;
			$this->prod_base_unidad = $pbund;
			$this->prod_prec_venta = $pvta;
			$this->prod_prec_compra = $pcmp;
		}
		
		$stmt->close();

		return $this;

	}

	function saveProducto($name, $desc, $und, $bund, $pcmp, $pvta) {
		$mysqli = $this->conexion();

		$qry = "INSERT INTO inv_producto(inv_prod_nombre, inv_prod_descripcion, inv_prod_unidad, inv_prod_base_unidad, inv_prod_prec_vta, inv_prod_prec_cmp)
		VALUES(?,?,?,?,?,?)";

		$mysqli->set_charset("utf8");

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("sssiii", $name, $desc, $und, $bund, $pvta, $pcmp);
		$stmt->execute();
		$producto_id = $stmt->insert_id;

		$stmt->close();

		return $producto_id;
	}

	function delProducto($id) {
		$mysqli = $this->conexion();

		$qry = "DELETE FROM inv_producto WHERE inv_prod_id = ?";

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("i", $id);
		$stmt->execute();
		$filas = $stmt->affected_rows;

		$stmt->close();

		return $filas;
	}

	function editProducto($id, $name, $desc, $und, $bund, $pcmp, $pvta) {
		$mysqli = $this->conexion();

		$qry = "UPDATE inv_producto SET 
		inv_prod_nombre = ?, 
		inv_prod_descripcion = ?,
		inv_prod_unidad = ?,
		inv_prod_base_unidad = ?,
		inv_prod_prec_vta = ?,
		inv_prod_prec_cmp = ?
		WHERE inv_prod_id = ?";

		$mysqli->set_charset("utf8");
		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("sssiiii", $name, $desc, $und, $bund, $pvta, $pcmp, $id);
		$res = $stmt->execute();

		if($res == true)
		{
			$producto_id = $id;
		}

		$stmt->close();

		return $producto_id;
	}
}
?>