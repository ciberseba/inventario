import { Producto } from './producto.model';
import { Proveedor } from './proveedor.model';

export class Compra {
	productos: Producto[];
	proveedor: Proveedor;

	total: number;
	extra: number;
	descuento: number;
	extraText: string;
	descuentoText: string;

	constructor() {}

	
}