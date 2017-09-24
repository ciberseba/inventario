import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto.model';
import { Compra } from '../../models/compra.model';
import { CompraService } from '../../services/compra/compra.service';
import { Router } from '@angular/router';

class compra {
	extra: number;
	extraText: string;
	descuento: number;
	descuentoText: string;

	constructor() {}

	setCompra(extra, extraText, desc, descText) {
		this.extra = extra;
		this.extraText = extraText;
		this.descuento = desc;
		this.descuentoText = descText;
	}
}

@Component({
  selector: 'compra-nueva',
  templateUrl: './views/compra-nueva.component.html',
  providers: [ProveedorService, ProductoService, CompraService]
})
export class CompraNuevaComponent implements OnInit {
	errorMessage: string;
	values = "";
	textInput = false;
	provBusq: Proveedor[];
	prodBusq: Producto[];
	provSel: Proveedor;
	prodSel: Producto;
	total: number = 0;
	cargoExtra: number = 0;
	descuento: number = 0;
	detalles: compra = new compra();
	buy: Compra = new Compra();
	listProds: Producto[] = [];

	constructor(private provService: ProveedorService, private prodService: ProductoService, private cmpService: CompraService, private router: Router) {}

	ngOnInit() {
		this.prodSel = new Producto(1,'','','','','','');
	}

	buscarProveedor() {}

	busqueda(value: string) {
		this.values = value;
		if(this.values.length > 3) {
			// Buscamos proveedor
			this.provService.buscarProveedor(this.values)
						.subscribe(
							respuesta => {
								this.provBusq = respuesta;
								console.log(this.provBusq);
							},
							error => this.errorMessage = <any> error);
			this.textInput = true;
		}
		else {
			this.textInput = false;
		}
	}

	busquedaProd(value: string) {
		this.values = value;
		if(this.values.length > 3) {
			// Buscamos proveedor
			this.prodService.buscarProducto(this.values)
						.subscribe(
							respuesta => {
								this.prodBusq = respuesta;
								console.log(this.provBusq);
							},
							error => this.errorMessage = <any> error);
			this.textInput = true;
		}
		else {
			this.textInput = false;
		}
	}

	selectProv(prov) {
		this.provSel = prov;
		console.log(this.provSel);
	}

	selectProd(prod) {
		this.prodSel = prod;
		console.log(this.prodSel);
	}
	removeProv() {
		this.provSel = null;
	}

	removeProd(i) {
		this.listProds.splice(i,1);
		this.calculoTotal();
	}

	calculoTotal() {
		this.total = 0;
		this.listProds.forEach((prod) => {
			this.total += prod.prod_cant * prod.prod_prec_compra; 
		});

		this.total = this.total + this.cargoExtra - this.descuento;
	}

	saveProd(i) {
		let prod = this.prodSel;

		let prodExiste = this.listProds.find(
			prod => prod.prod_id == this.prodSel.prod_id);

		console.log(prodExiste);
		if(prodExiste) {
			this.listProds.splice(this.listProds.findIndex(
				prod => prod.prod_id == prodExiste.prod_id),1);
		}

		this.listProds.push(prod);
		this.calculoTotal();
		this.prodSel = new Producto(1,'','','','','','');
		this.busquedaProd('');
	}

	suma(valor: number) {
		valor = Number(valor);
		this.setCargoExtra(valor);
		this.calculoTotal();
	}

	resta(valor: number) {
		this.setDescuento(valor);
		this.calculoTotal();	
	}

	setCargoExtra(valor: number) {
		this.cargoExtra = valor;
	}

	setDescuento(valor: number) {
		this.descuento = valor;
	}

	getTotal(): number {
		return this.total;
	}

	onSubmit() {
		console.log(this.listProds);
		this.buy.productos = this.listProds;
		this.buy.proveedor = this.provSel;

		if(this.detalles.extra == null)
			this.detalles.extra = 0;

		if(this.detalles.descuento == null)
			this.detalles.descuento = 0;

		this.buy.descuento = this.detalles.descuento;
		this.buy.descuentoText = this.detalles.descuentoText;
		this.buy.extra = this.detalles.extra;
		this.buy.extraText = this.detalles.extraText;
		this.buy.total = this.total;

		this.cmpService.addCompra(this.buy)
						.subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                            	let compra_id = respuesta.id;
                              this.buy.productos.forEach(producto => {
									let i = 0;
									while(i < producto.prod_cant) {
										this.saveProducto(producto.prod_id, compra_id, producto.prod_prec_compra);
										i++;
									}
								});
                              alert("Compra agregada correctamente");
                              this.router.navigate(['compras']);
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => console.log("Error Agregando Compra")
                          );
	}

	saveProducto(id: number, cid: number, prec_compra: number) {
		this.cmpService.addProductoCompra(id, cid, prec_compra)
								.subscribe(
									respuesta => { },
									error => console.log("Error agregando producto a compra")
								);
	}
}