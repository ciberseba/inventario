import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClienteService {
	private serviceUrl = 'http://facilsoft.info/inventario/services';
	private listClientesUrl = this.serviceUrl + '/cliente.php?mode=list';
	private addClienteUrl = this.serviceUrl + '/cliente.php?mode=add';
	private updClienteUrl = this.serviceUrl + '/cliente.php?mode=edit';
	private delClienteUrl = this.serviceUrl + '/cliente.php?mode=del';
	private getClienteUrl = this.serviceUrl + '/cliente.php?mode=get';

	cliente: Cliente;

	constructor(private http: Http) {}

	listClientes(): Observable<Cliente[]> {
		return this.http.get(this.listClientesUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}

	getCliente(id): Observable<Cliente> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('id', id);
	    let data = body.toString();

	    return this.http.post(this.getClienteUrl, data, options)
	                    .map(this.savedData)
	                    .catch(this.handleError);
	}

	addCliente(rut,nombre,dir,ciu,fono,mail) {
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

    	return this.http.post(this.addClienteUrl, data, options)
                    .map(this.savedData)
                    .catch(this.handleError);
	}

	editCliente(id,rut,nombre,dir,ciu,fono,mail) {
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

	    return this.http.post(this.updClienteUrl, data, options)
	                    .map(this.savedData)
	                    .catch(this.handleError);

	}


	delCliente(id): Observable<boolean> {
		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('id', id);
	    let data = body.toString();

	    return this.http.post(this.delClienteUrl, data, options)
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