export class User {

	user_id: number;
	username: string;
	password: string;
	saved: boolean;
	
	error: boolean;
	error_id: number;
	error_mensaje: string;

	constructor(id, nombre, password, saved) {
		this.user_id = id;
		this.username = nombre;
		this.password = password;
		this.saved = saved;
	}
}
