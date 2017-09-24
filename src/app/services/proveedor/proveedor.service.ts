import { Injectable } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProveedorService {
	private serviceUrl = 'http://facilsoft.info/inventario/services';
	private listProveedoresUrl = this.serviceUrl + '/proveedor.php?mode=list';
	private addProveedorUrl = this.serviceUrl + '/proveedor.php?mode=add';
	private updProveedorUrl = this.serviceUrl + '/proveedor.php?mode=edit';
	private delProveedorUrl = this.serviceUrl + '/proveedor.php?mode=del';
	private getProveedorUrl = this.serviceUrl + '/proveedor.php?mode=get';
	private busqProveedorUrl = this.serviceUrl + '/proveedor.php?mode=busq';

	proveedor: Proveedor;

	constructor(private http: Http) {}

	listProveedores(): Observable<Proveedor[]> {
		return this.http.get(this.listProveedoresUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}

	getProveedor(id): Observable<Proveedor> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('id', id);
	    let data = body.toString();

	    return this.http.post(this.getProveedorUrl, data, options)
	                    .map(this.savedData)
	                    .catch(this.handleError);
	}

	buscarProveedor(strBusqueda): Observable<Proveedor[]> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('busqueda', strBusqueda);
	    let data = body.toString();

	    return this.http.post(this.busqProveedorUrl, data, options)
	    				.map(this.extractData)
	    				.catch(this.handleError);
	}

	addProveedor(rut,nombre,dir,ciu,fono,mail) {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('rut', rut);
	    body.append('nombre', nombre);
	    body.append('dir', dir);
		body.append('ciu', ciu);
		body.append('fono', fono);
		body.append('mail', mail);

		let data = body.toString()

    	return this.http.post(this.addProveedorUrl, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
	}

	editProveedor(id,rut,nombre,dir,ciu,fono,mail) {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('rut', rut);
	    body.append('nombre', nombre);
	    body.append('dir', dir);
		body.append('ciu', ciu);
		body.append('fono', fono);
		body.append('mail', mail);
		body.append('id', id);
		let data = body.toString()

	    return this.http.post(this.updProveedorUrl, data, options)
	                    .map(this.savedData)
	                    .catch(this.handleError);

	}


	delProveedor(id): Observable<boolean> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('id', id);
	    let data = body.toString();

	    return this.http.post(this.delProveedorUrl, data, options)
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