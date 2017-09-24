<?php
class compra {
	var $cmp_id;
	var $cmp_fecha;
	var $cmp_total;
	var $cmp_extra;
	var $cmp_desc;
	var $prv_id;

	function __construct() {}

	function conexion() {
		$database = new db();
		$db = $database->conexion();

		return $db;
	}

	function addCompra($total, $extra, $desc, $pid) {
		$mysqli = $this->conexion();

		$qry = "INSERT INTO inv_compra(inv_cmp_fecha, inv_cmp_total, inv_cmp_extra, inv_cmp_desc, inv_prov_id) VALUES(?,?,?,?,?)";

		$mysqli->set_charset("utf8");

		$fecha = date("Y-m-d H:i:s");

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("siiii", $fecha, $total, $extra, $desc, $pid);
		$stmt->execute();
		$compra_id = $stmt->insert_id;

		$stmt->close();

		return $compra_id;
	}

	function addProductoCompra($cid, $pid, $costo) {
		$mysqli = $this->conexion();

		$qry = "INSERT INTO inv_unidad(inv_prod_id, inv_precio_costo, inv_estund_id, inv_cmp_id) VALUES(?,?,?,?)";

		$mysqli->set_charset("utf8");

		$estado = 2;

		$stmt = $mysqli->prepare($qry);

		$stmt->bind_param("iiii", $pid, $costo, $estado, $cid);
		$stmt->execute();
		$cmpprd_id = $stmt->insert_id;

		$stmt->close();

		return $cmpprd_id;	
	}
}
?>