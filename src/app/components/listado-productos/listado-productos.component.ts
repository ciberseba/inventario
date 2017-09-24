import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
  providers: [ProductoService]
})
export class ListadoProductosComponent implements OnInit {

  errorMessage: string;

  confirmDelete: boolean;

  delRespuesta: boolean;

	productos: Producto[];

  constructor(private productoService: ProductoService) { }

  getProductos(): void {
  	this.productoService.getProductos()
                           .subscribe(
                             productos => this.productos = productos ,
                             error => this.errorMessage = <any> error);

                           console.log(this.productos);
  }

  ngOnInit() {
  	this.getProductos();
  }

  borrar(producto: Producto): void {
    console.log("Borrando elemento " + producto.prod_id);
    this.confirmDelete = confirm('¿Está seguro que desea borrar');

    if(this.confirmDelete == true) {
      this.productoService.borrarProducto(producto.prod_id)
                          .subscribe(
                              respuesta => {
                                this.productos.splice(producto.prod_id);
                                console.log(respuesta.valueOf);
                                this.getProductos();
                              });
      console.log("Confirmacion borrado elemento " + producto.prod_id);
    }
  }

}
