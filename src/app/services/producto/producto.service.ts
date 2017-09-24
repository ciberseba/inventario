import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductoService {

	private serviceUrl = 'http://facilsoft.info/inventario/services';
	private getListadoProductosUrl = this.serviceUrl + '/producto.php?mode=listProductos';
  private newProducto = this.serviceUrl + '/producto.php?mode=newProduct';
  private delProducto = this.serviceUrl + '/producto.php?mode=delProducto';
  private getProductoUrl = this.serviceUrl + '/producto.php?mode=getProducto';
  private editProductoUrl = this.serviceUrl + '/producto.php?mode=editProduct';
  private searchProductoUrl = this.serviceUrl + '/producto.php?mode=busq';

	producto: Producto;

	/*Prod: Producto[] = [
		{prod_id: 1, prod_nombre: 'Leche Colún 200cc', prod_descripcion: 'Leche Colún 200cc', prod_unidad: 'unidad', prod_base_unidad: 1},
		{prod_id: 2, prod_nombre: 'Queso Ranco Colún 250 grs', prod_descripcion: 'Queso laminado Colún 250 grs', prod_unidad: 'unidad', prod_base_unidad: 1},
		{prod_id: 3, prod_nombre: 'Jamón Pierna San Jorge 150 grs', prod_descripcion: 'Jamón Laminado San Jorge 150 grs', prod_unidad: 'unidad', prod_base_unidad: 1}
	]; */


  constructor(private http: Http) { }


  getProductos(): Observable<Producto[]>{
  	return this.http.get(this.getListadoProductosUrl)
  					.map(this.extractData)
  					.catch(this.handleError);
  }

  buscarProducto(strBusqueda): Observable<Producto[]> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({headers: headers});
      let body = new URLSearchParams();
      body.append('busqueda', strBusqueda);
      let data = body.toString();

      return this.http.post(this.searchProductoUrl, data, options)
              .map(this.extractData)
              .catch(this.handleError);
  }

  getProducto(id): Observable<Producto>{
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    body.append('id', id);
    let data = body.toString();

    return this.http.post(this.getProductoUrl, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
  }

  private extractData(respuesta: Response) {
  	let body = respuesta.json();
    console.log(body);
  	return body.data || { };
  }

  private savedData(respuesta: Response) {
    let body = respuesta.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: Response | any) {
  	// In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      console.log(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  addProducto(id, name, desc, und, bund, pcmp, pvta): Observable<Producto> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    body.append('name', name);
    body.append('desc', desc);
    body.append('und', und);
    body.append('bund', bund);
    body.append('pcmp', pcmp);
    body.append('pvta', pvta);
    let data = body.toString()

    return this.http.post(this.newProducto, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
  }

  borrarProducto(id): Observable<boolean> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    body.append('id', id);
    let data = body.toString();

    return this.http.post(this.delProducto, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
  }

  saveProducto(id, name, desc, und, bund, pcmp, pvta): Observable<Producto> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    body.append('id',id);
    body.append('name', name);
    body.append('desc', desc);
    body.append('und', und);
    body.append('bund', bund);
    body.append('pcmp', pcmp);
    body.append('pvta', pvta);
    let data = body.toString()

    return this.http.post(this.editProductoUrl, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
  }
}
