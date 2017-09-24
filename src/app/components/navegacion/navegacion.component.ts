import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
  providers: [LoginService]
})
export class NavegacionComponent implements OnInit {

	user: User;
	userStr: string;
	mostrarMenu: boolean;
  isLogged: boolean;
  isIn = false;
  ddIn = false;

  	constructor(private login: LoginService) { }

  	ngOnInit() {
  		this.isLogged = this.login.usuarioValido();

  		this.userStr = this.login.getUser();
      console.log(this.userStr);

  		if(this.userStr != null) {
  			this.mostrarMenu = true;
  		}
  	}

    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

    dd() { // click handler
        console.log("hover");
        let bool = this.ddIn;
        this.ddIn = bool === false ? true : false; 
    }

  	logout() {
  		this.login.logout();
  	}

}
