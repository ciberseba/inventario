import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

@Component({
  selector: 'proveedores',
  templateUrl: './views/proveedores.component.html',
  //styleUrls: ['./views/proveedores.component.css'],
  providers: [ProveedorService]
})
export class ProveedoresComponent implements OnInit {

	errorMessage: string;
	confirmDelete: boolean;
	delRespuesta: boolean;
	proveedores: Proveedor[];

	constructor(private provService: ProveedorService) {}

	ngOnInit() {
		this.listProveedores();
	}

	listProveedores(): void {
		this.provService.listProveedores()
						.subscribe(
							respuesta => this.proveedores = respuesta,
							error => this.errorMessage = <any> error);
	}

	borrar(proveedor: Proveedor): void {
		this.provService.delProveedor(proveedor.prov_id)
						.subscribe(
							respuesta => {
								this.proveedores.splice(proveedor.prov_id);
								this.listProveedores();
							});
	}
}