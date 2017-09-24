import { Injectable } from '@angular/core';
import { Compra } from '../../models/compra.model';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CompraService {
	private serviceURL = 'http://facilsoft.info/inventario/services';
	private saveCompraURL = this.serviceURL + '/compra.php?mode=add';
	private saveProductoCompraURL = this.serviceURL + '/compra.php?mode=addProducto';

	constructor(private http: Http) {}

	addCompra(cmp: Compra) {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('total', cmp.total.toString());
	    body.append('extra', cmp.extra.toString());
	    body.append('desc', cmp.descuento.toString());
	    body.append('prov', cmp.proveedor.prov_id.toString());

		let data = body.toString();

    	return this.http.post(this.saveCompraURL, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
	}

	addProductoCompra(prod: number, id: number, costo: number) {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();

	    body.append('producto',prod.toString());
	    body.append('compra', id.toString());
	    body.append('costo', costo.toString());

	    let data = body.toString();

	    return this.http.post(this.saveProductoCompraURL, data, options)
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
}