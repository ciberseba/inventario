import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  providers: [ProductoService]
})
export class EditarProductoComponent implements OnInit {
  id: number;
  private sub: any;
  producto: Producto;
  currentProd: string;
  resp: any;
  errorMessage: string;
  model = new Producto(1, '','', '', '', '', '');

  constructor(private route: ActivatedRoute, private productoService: ProductoService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
  		this.id = +params['id'];

  		this.getProducto(this.id);

  	}); 
  }

  getProducto(id): any {
  	return this.productoService.getProducto(id)
  						.subscribe(respuesta => {
  							this.producto = respuesta;
  							this.model = this.producto;
  						});
  }

  onSubmit(id): void {
  	// TBD
  	if(this.model) {
  		console.log(this.model);
  		this.currentProd = JSON.stringify(this.model);
  		this.productoService.saveProducto(this.model.prod_id, this.model.prod_nombre, this.model.prod_descripcion, this.model.prod_unidad, this.model.prod_base_unidad, this.model.prod_prec_compra, this.model.prod_prec_venta)
                        .subscribe(
                          respuesta => {
                            if(respuesta.error != true) {
                              alert("Producto " + respuesta.prod_nombre + " modificado");
                            } else {
                              alert(respuesta.error_mensaje);
                            }
                        },
                          error => {
                            alert("Error en modificación de Producto");
                            console.log("Error Modificando Producto")
                          });
  	
  	}
  }

}
