<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Accept");

require("../classes/db.php");
require("../classes/cliente.php");

if(isset($_GET['mode']) && $_GET['mode'] == 'list') {
	$clie = new Cliente();

	$clientes = $clie->listClientes();
	$clies['data'] = array();

	foreach ($clientes as $id => $value) {
		$clie2 = new Cliente();

		$cliente = $clie2->getCliente($value);
		array_push($clies['data'],$cliente);
	}

	echo json_encode($clies);
}

if(isset($_GET) && $_GET['mode'] == 'get') {
	
	if(is_numeric($_POST['id'])) {
		$clie = new Cliente();

		$cliente = $clie->getCliente($_POST['id']);

		if($cliente->clie_nombre != '') {
			// Devolvemos producto por pantalla
			echo json_encode($cliente);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "02";
			$error['error_mensaje'] = "Cliente no existe";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "01";
		$error['error_mensaje'] = "ID Cliente Inválido";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'add') {
	
	if($_POST['rut'] != '' && $_POST['nombre'] != '') {
		$clie = new Cliente();

		$cliente_id = $clie->addCliente($_POST['rut'], $_POST['nombre'], $_POST['dir'], $_POST['ciu'], $_POST['fono'], $_POST['mail']);

		if($cliente_id > 0) {
			// Devolvemos producto por pantalla
			$cliente = $clie->getCliente($cliente_id);
			echo json_encode($cliente);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "04";
			$error['error_mensaje'] = "Cliente no se pudo ingresar. Error en la consulta.";
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
		$clie = new Cliente();

		$cliente_id = $clie->saveCliente($_POST['id'], $_POST['rut'], $_POST['nombre'], $_POST['dir'], $_POST['ciu'], $_POST['fono'], $_POST['mail']);

		if($cliente_id > 0) {
			// Devolvemos producto por pantalla
			$cliente = $clie->getCliente($cliente_id);
			echo json_encode($cliente);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "06";
			$error['error_mensaje'] = "Cliente no se pudo editar. Error en la consulta.";
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
		$clie = new Cliente();

		$result = $clie->delCliente($_POST['id']);

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