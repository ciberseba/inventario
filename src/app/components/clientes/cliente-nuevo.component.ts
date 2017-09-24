import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ModalComponent } from '../modal/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';

@Component({
  selector: 'cliente',
  templateUrl: './views/cliente.component.html',
  //styleUrls: ['./views/proveedores.component.css'],
  providers: [ClienteService]
})
export class ClienteNuevoComponent implements OnInit {

	model = new Cliente(1,'','','','','','');
	currentProv: string;
	errorMessage: string;
	mode = 'Observable';

	constructor(private cliService: ClienteService, private router: Router) {}

	ngOnInit() {}

	onSubmit() {
  	this.currentProv = JSON.stringify(this.model);
  	this.cliService.addCliente(this.model.clie_rut, this.model.clie_nombre, this.model.clie_direccion, this.model.clie_ciudad, this.model.clie_fono, this.model.clie_mail)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Cliente " + respuesta.clie_nombre + " agregado");
                              this.router.navigate(['clientes']);
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => console.log("Error Agregando Cliente")
                          );
  	//console.log(respuesta);
  }
}
