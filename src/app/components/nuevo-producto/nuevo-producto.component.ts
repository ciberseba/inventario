import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto.model';
import { ModalComponent } from '../modal/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
  providers: [ProductoService,DialogService]
})
export class NuevoProductoComponent implements OnInit {

	model = new Producto(1, '', '', '', '', '', '');
	currentProd: string;
  errorMessage: string;
  mode = 'Observable';

  constructor(private productoService: ProductoService, private dialogService:DialogService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.currentProd = JSON.stringify(this.model);
  	this.productoService.addProducto(this.model.prod_id, this.model.prod_nombre, this.model.prod_descripcion, this.model.prod_unidad, this.model.prod_base_unidad, this.model.prod_prec_compra, this.model.prod_prec_venta)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Producto " + respuesta.prod_nombre + " agregado");
                              this.router.navigate(['productos']);
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => console.log("Error Agregando Producto")
                          );
  	//console.log(respuesta);
  }

  showModal(titulo, mensaje) {
      let disposable = this.dialogService.addDialog(ModalComponent, {
          title:titulo, 
          message:mensaje })
          .subscribe((isConfirmed)=>{
              //We get dialog result
              if(isConfirmed) {
                  alert('accepted');
              }
              else {
                  alert('declined');
              }
          });
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      setTimeout(()=>{
          disposable.unsubscribe();
      },10000);
  }
}
