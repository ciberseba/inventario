import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente/cliente.service';

@Component({
  selector: 'clientes',
  templateUrl: './views/clientes.component.html',
  //styleUrls: ['./views/Clientees.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

	errorMessage: string;
	confirmDelete: boolean;
	delRespuesta: boolean;
	clientes: Cliente[];

	constructor(private clieService: ClienteService) {}

	ngOnInit() {
		this.listClientes();
	}

	listClientes(): void {
		this.clieService.listClientes()
						.subscribe(
							respuesta => this.clientes = respuesta,
							error => this.errorMessage = <any> error);
	}

	borrar(cliente: Cliente): void {
		this.clieService.delCliente(cliente.clie_id)
						.subscribe(
							respuesta => {
								this.clientes.splice(cliente.clie_id);
								this.listClientes();
							});
	}
}