import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../services/proveedor/proveedor.service';

@Component({
  selector: 'proveedor',
  templateUrl: './views/proveedor.component.html',
  //styleUrls: ['./views/proveedores.component.css'],
  providers: [ProveedorService]
})
export class ProveedorComponent implements OnInit {

	id: number;
	private sub: any;
	proveedor: Proveedor;
	currentProv: string;
	resp: any;
	errorMessage: string;
 	model = new Proveedor(1,'','','','','','');

	constructor(private route: ActivatedRoute, private provService: ProveedorService) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.getProveedor(this.id);

    }); 
	}

	getProveedor(id): any {
		return this.provService.getProveedor(id)
  						.subscribe(respuesta => {
  							this.proveedor = respuesta;
  							this.model = this.proveedor;
  						});
	}

	onSubmit(id): void {
  	if(this.model) {
  		console.log(this.model);
  		this.currentProv = JSON.stringify(this.model);
  		this.provService.editProveedor(this.model.prov_id, this.model.prov_rut, this.model.prov_nombre, this.model.prov_direccion, this.model.prov_ciudad, this.model.prov_fono, this.model.prov_mail)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Proveedor " + respuesta.prov_nombre + " modificado");
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => {
                            alert("Error en modificación de Proveedor");
                            console.log("Error Modificando Proveedor")
                          });
  	
  	}
  }
}