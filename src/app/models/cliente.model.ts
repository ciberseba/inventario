export class Cliente {

	clie_id: number;
	clie_rut: string;
	clie_nombre: string;
	clie_direccion: string;
	clie_ciudad: string;
	clie_fono: number;
	clie_mail: string;

	error: boolean;
	error_id: number;
	error_mensaje: string;

	constructor(id,rut,nmb,dir,ciu,fon,mail) {
		this.clie_id = id;
		this.clie_rut = rut;
		this.clie_nombre = nmb;
		this.clie_direccion = dir;
		this.clie_ciudad = ciu;
		this.clie_fono = fon;
		this.clie_mail = mail;
	}

}