export class Producto {

	prod_id: number;
	prod_nombre: string;
	prod_descripcion: string;
	prod_unidad: string;
	prod_base_unidad: number;
	prod_prec_venta: number;
	prod_prec_compra: number;
	prod_cant: number;

	error: boolean;
	error_id: number;
	error_mensaje: string;

	constructor(id, nombre, descripcion, unidad, bunidad, pvta, pcmp) {
		this.prod_id = id;
		this.prod_nombre = nombre;
		this.prod_descripcion = descripcion;
		this.prod_unidad = unidad;
		this.prod_base_unidad = bunidad;
		this.prod_prec_compra = pcmp;
		this.prod_prec_venta = pvta;
	}
}
