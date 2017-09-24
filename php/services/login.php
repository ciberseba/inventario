<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Accept");

require("../classes/db.php");
require("../classes/user.php");

if(isset($_POST) && $_POST['username'] != '' && $_POST['password'] != '') {
	$user = new user();

	$user->login($_POST['username'],md5($_POST['password']));

	if($user->username == '') {
		$error['error'] = true;
		$error['error_id'] = "11";
		$error['error_mensaje'] = "Error en Ingreso. Nombre de Usuario o Contraseña no encontrados, o Contraseña Incorrecta.";

		echo json_encode($error);

	} else {
		echo json_encode($user);	
	}
	
}
else {
	$error['error'] = true;
	$error['error_id'] = "10";
	$error['error_mensaje'] = "Error en Ingreso. Debe ingresar nombre de usuario y/o contraseña";

	echo json_encode($error);
}

?>