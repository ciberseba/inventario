import { Component, OnInit } from '@angular/core';

import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { ModalComponent } from '../modal/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';

@Component({
  selector: 'proveedor',
  templateUrl: './views/proveedor.component.html',
  //styleUrls: ['./views/proveedores.component.css'],
  providers: [ProveedorService]
})
export class ProveedorNuevoComponent implements OnInit {

	model = new Proveedor(1,'','','','','','');
	currentProv: string;
	errorMessage: string;
	mode = 'Observable';

	constructor(private provService: ProveedorService, private router: Router) {}

	ngOnInit() {}

	onSubmit() {
  	this.currentProv = JSON.stringify(this.model);
  	this.provService.addProveedor(this.model.prov_rut, this.model.prov_nombre, this.model.prov_direccion, this.model.prov_ciudad, this.model.prov_fono, this.model.prov_mail)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Proveedor " + respuesta.prov_nombre + " agregado");
                              this.router.navigate(['proveedores']);
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => console.log("Error Agregando Proveedor")
                          );
  	//console.log(respuesta);
  }
}
