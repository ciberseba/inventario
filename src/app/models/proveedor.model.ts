export class Proveedor {

	prov_id: number;
	prov_rut: string;
	prov_nombre: string;
	prov_direccion: string;
	prov_ciudad: string;
	prov_fono: number;
	prov_mail: string;

	error: boolean;
	error_id: number;
	error_mensaje: string;

	constructor(id,rut,nmb,dir,ciu,fon,mail) {
		this.prov_id = id;
		this.prov_rut = rut;
		this.prov_nombre = nmb;
		this.prov_direccion = dir;
		this.prov_ciudad = ciu;
		this.prov_fono = fon;
		this.prov_mail = mail;
	}

}