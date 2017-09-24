import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ModalComponent } from '../modal/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cliente',
  templateUrl: './views/cliente.component.html',
  //styleUrls: ['./views/Clientees.component.css'],
  providers: [ClienteService]
})

export class ClienteComponent implements OnInit {

	id: number;
	private sub: any;
	cliente: Cliente;
	currentProv: string;
	resp: any;
	errorMessage: string;
 	model = new Cliente(1,'','','','','','');

	constructor(private route: ActivatedRoute, private provService: ClienteService) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.getCliente(this.id);

    }); 
	}

	getCliente(id): any {
		return this.provService.getCliente(id)
  						.subscribe(respuesta => {
  							this.cliente = respuesta;
  							this.model = this.cliente;
  						});
	}

	onSubmit(id): void {
  	if(this.model) {
  		console.log(this.model);
  		this.currentProv = JSON.stringify(this.model);
  		this.provService.editCliente(this.model.clie_id, this.model.clie_rut, this.model.clie_nombre, this.model.clie_direccion, this.model.clie_ciudad, this.model.clie_fono, this.model.clie_mail)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Cliente " + respuesta.clie_nombre + " modificado");
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => {
                            alert("Error en modificación de Cliente");
                            console.log("Error Modificando Cliente")
                          });
  	
  	}
  }
}