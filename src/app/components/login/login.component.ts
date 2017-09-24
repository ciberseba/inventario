import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

	model = new User('','','','');
	currentLogin: string;
	errorMessage: string;

  	constructor(private loginService: LoginService) { }

  	ngOnInit() {
      if(this.loginService.usuarioValido()) {
        console.log("usuario valido");
        this.loginService.redirectMain();
      }
  	}

  	onSubmit() {
  		this.currentLogin = JSON.stringify(this.model);
  		this.loginService.login(this.model.username, this.model.password, this.model.saved)
  						.subscribe(
  							respuesta => {
  								this.errorMessage = respuesta.error_mensaje;
  								if(respuesta.user_id > 0) {
                    if(this.model.saved == true) {
                      this.loginService.saveLocal(respuesta);
                    }
  									this.loginService.saveSession(respuesta);
  								}
  							});
  	}

}
