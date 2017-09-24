<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Accept");

require("../classes/db.php");
require("../classes/proveedor.php");

if(isset($_GET['mode']) && $_GET['mode'] == 'list') {
	$prov = new Proveedor();

	$proveedores = $prov->listProveedores();
	$provs['data'] = array();

	foreach ($proveedores as $id => $value) {
		$prov2 = new Proveedor();

		$proveedor = $prov2->getProveedor($value);
		array_push($provs['data'],$proveedor);
	}

	echo json_encode($provs);
}

if(isset($_GET) && $_GET['mode'] == 'get') {
	
	if(is_numeric($_POST['id'])) {
		$prov = new Proveedor();

		$proveedor = $prov->getProveedor($_POST['id']);

		if($proveedor->prov_nombre != '') {
			// Devolvemos producto por pantalla
			echo json_encode($proveedor);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "02";
			$error['error_mensaje'] = "Proveedor no existe";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "01";
		$error['error_mensaje'] = "ID Proveedor Inválido";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'busq') {
	
	if($_POST['busqueda'] != '') {
		$prov = new Proveedor();

		$proveedores = $prov->buscarProveedor($_POST['busqueda']);

		$provs['data'] = array();

		foreach ($proveedores as $id => $value) {
			$prov2 = new Proveedor();

			$proveedor = $prov2->getProveedor($value);
			array_push($provs['data'],$proveedor);
		}

		echo json_encode($provs);
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "08";
		$error['error_mensaje'] = "No se encontraron proveedores";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'add') {
	
	if($_POST['rut'] != '' && $_POST['nombre'] != '') {
		$prov = new Proveedor();

		$proveedor_id = $prov->addProveedor($_POST['rut'], $_POST['nombre'], $_POST['dir'], $_POST['ciu'], $_POST['fono'], $_POST['mail']);

		if($proveedor_id > 0) {
			// Devolvemos producto por pantalla
			$proveedor = $prov->getProveedor($proveedor_id);
			echo json_encode($proveedor);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "04";
			$error['error_mensaje'] = "Proveedor no se pudo ingresar. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "05";
		$error['error_mensaje'] = "RUT o Nombre en blanco";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'edit') {
	
	if($_POST['rut'] != '' && $_POST['nombre'] != '') {
		$prov = new Proveedor();

		$proveedor_id = $prov->saveProveedor($_POST['id'], $_POST['rut'], $_POST['nombre'], $_POST['dir'], $_POST['ciu'], $_POST['fono'], $_POST['mail']);

		if($proveedor_id > 0) {
			// Devolvemos producto por pantalla
			$proveedor = $prov->getProveedor($proveedor_id);
			echo json_encode($proveedor);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "06";
			$error['error_mensaje'] = "Proveedor no se pudo editar. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "07";
		$error['error_mensaje'] = "RUT o Nombre en blanco";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'del') {
	
	if($_POST['id'] != '' && is_numeric($_POST['id'])) {
		$prov = new Proveedor();

		$result = $prov->delProveedor($_POST['id']);

		if($result > 0) {
			// Devolvemos producto por pantalla
			echo true;
		}
		else {
			echo false;	
		}
	}
	else {
		echo false;
	}
}

if(!isset($_GET['mode'])) {
	$error['error'] = true;
	$error['error_id'] = "03";
	$error['error_mensaje'] = "No se recibieron datos";

	echo json_encode($error);
}
?>