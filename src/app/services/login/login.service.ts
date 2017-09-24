import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../models/user.model'; 


@Injectable()
export class LoginService {

	private serviceUrl = 'http://facilsoft.info/inventario/services';
	private loginUrl = this.serviceUrl + '/login.php';

	usuario: User;
  usuarioStr: string;

  	constructor(private http: Http, private router: Router) { }

  	login(username, password, saved): Observable<User> {
  		let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	    let options = new RequestOptions({headers: headers});
	    let body = new URLSearchParams();
	    body.append('username', username);
	    body.append('password', password);
	    let data = body.toString();

	    return this.http.post(this.loginUrl, data, options)
	                    .map(this.savedData)
	                    .catch(this.handleError);
  	}

    saveSession(user: User) {
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("user_id", user.user_id.toString());
      this.router.navigate(['productos']);
    }

    redirectMain() {
      this.router.navigate(['productos']);
    }

    saveLocal(user: User) {
      localStorage.setItem("status", "saved");
      localStorage.setItem("username", user.username);
      localStorage.setItem("user_id", user.user_id.toString());
      console.log("Guardado local de ingreso - Username: " + user.username);
    }

    getLocal() {
      if(localStorage.getItem("status") == "saved") {
        sessionStorage.setItem("username", localStorage.getItem("username"));
        sessionStorage.setItem("user_id", localStorage.getItem("user_id"));
      }
    }

    logout() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      localStorage.removeItem("status");
      this.router.navigate(['login']);
    }

    usuarioValido(): boolean {
      // Primero vemos si hay usuarios en la sesión actual
      if(sessionStorage.getItem("username") === null) {
        // Ahora vemos si hay algo guardado a nivel local
        if(localStorage.getItem("status") == "saved") {
          // Si existe, guardamos la sesión
          this.getLocal();
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }
      else {
        return true;
      }
    }

    getUser(): string {
      this.usuarioStr = sessionStorage.getItem("username");
      console.log(this.usuarioStr);
      return this.usuarioStr;
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
