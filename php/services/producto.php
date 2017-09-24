<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Accept");

require("../classes/db.php");
require("../classes/producto.php");

if(isset($_GET['mode']) && $_GET['mode'] == 'listProductos') {
	$prod = new Producto();

	$productos = $prod->getProductos();
	$prods['data'] = array();

	foreach ($productos as $id => $value) {
		$prod2 = new Producto();

		$producto = $prod2->getProducto($value);
		array_push($prods['data'],$producto);
	}

	echo json_encode($prods);
}

if(isset($_GET) && $_GET['mode'] == 'getProducto') {
	
	if(is_numeric($_POST['id'])) {
		$prod = new Producto();

		$producto = $prod->getProducto($_POST['id']);

		if($producto->prod_nombre != '') {
			// Devolvemos producto por pantalla
			echo json_encode($producto);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "02";
			$error['error_mensaje'] = "Producto no existe";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "01";
		$error['error_mensaje'] = "ID Producto Inválido";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'busq') {
	
	if($_POST['busqueda'] != '') {
		$prov = new Producto();

		$proveedores = $prov->buscarProducto($_POST['busqueda']);

		$provs['data'] = array();

		foreach ($proveedores as $id => $value) {
			$prov2 = new Producto();

			$proveedor = $prov2->getProducto($value);
			array_push($provs['data'],$proveedor);
		}

		echo json_encode($provs);
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "08";
		$error['error_mensaje'] = "No se encontraron productos";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'newProduct') {
	
	if($_POST['name'] != '' && $_POST['desc'] != '') {
		$prod = new Producto();

		$producto_id = $prod->saveProducto($_POST['name'], $_POST['desc'], $_POST['und'], $_POST['bund'], $_POST['pcmp'], $_POST['pvta']);

		if($producto_id > 0) {
			// Devolvemos producto por pantalla
			$producto = $prod->getProducto($producto_id);
			echo json_encode($producto);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "04";
			$error['error_mensaje'] = "Producto no se pudo ingresar. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "05";
		$error['error_mensaje'] = "Nombre o Descripción en blanco";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'editProduct') {
	
	if($_POST['name'] != '' && $_POST['desc'] != '') {
		$prod = new Producto();

		$producto_id = $prod->editProducto($_POST['id'], $_POST['name'], $_POST['desc'], $_POST['und'], $_POST['bund'], $_POST['pcmp'], $_POST['pvta']);

		if($producto_id > 0) {
			// Devolvemos producto por pantalla
			$producto = $prod->getProducto($producto_id);
			echo json_encode($producto);
		}
		else {
			$error['error'] = true;
			$error['error_id'] = "06";
			$error['error_mensaje'] = "Producto no se pudo editar. Error en la consulta.";
			echo json_encode($error);	
		}
	}
	else {
		$error['error'] = true;
		$error['error_id'] = "07";
		$error['error_mensaje'] = "Nombre o Descripción en blanco";

		echo json_encode($error);
	}
}

if(isset($_GET) && $_GET['mode'] == 'delProducto') {
	
	if($_POST['id'] != '' && is_numeric($_POST['id'])) {
		$prod = new Producto();

		$result = $prod->delProducto($_POST['id']);

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