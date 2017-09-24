<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Accept");

require("../classes/db.php");
require("../classes/compra.php");

/*if(isset($_GET['mode']) && $_GET['mode'] == 'list') {
	$cmp = new Compra();

	$compras = $cmp->listClientes();
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
*/
if(isset($_GET) && $_GET['mode'] == 'add') {
	
	if($_POST['total'] != '' && $_POST['total'] >= 0) {
		$cmp = new Compra();

		$compra_id = $cmp->addCompra($_POST['total'], $_POST['extra'], $_POST['desc'], $_POST['prov']);

		if($compra_id > 0) {
			// Devolvemos producto por pantalla
			$compra['id'] = $compra_id;
			echo json_encode($compra);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "04";
			$error['error_mensaje'] = "Compra no se pudo ingresar. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "05";
		$error['error_mensaje'] = "Total no puede ser menor a 0";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'addProducto') {
	
	if($_POST['producto'] != '' && $_POST['compra'] != 0) {
		$cmp = new Compra();

		$cmpprd_id = $cmp->addProductoCompra($_POST['compra'], $_POST['producto'], $_POST['costo']);

		if($cmpprd_id > 0) {
			// Devolvemos producto por pantalla
			$cmpprd['id'] = $cmpprd_id;
			echo json_encode($cmpprd);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "10";
			$error['error_mensaje'] = "Producto no se pudo ingresar a compra. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "11";
		$error['error_mensaje'] = "No se pudo guardar producto en compra";

		echo json_encode($error);
	}
}

/*if(isset($_GET) && $_GET['mode'] == 'edit') {
	
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
*/
if(!isset($_GET['mode'])) {
	$error['error'] = true;
	$error['error_id'] = "03";
	$error['error_mensaje'] = "No se recibieron datos";

	echo json_encode($error);
}
?>