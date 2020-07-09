import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../modules/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: User = new User(0,"","","");
	registroform: boolean = false;
  errnor: string = "";

  constructor(
    private _authService: AuthService,
    private _usersService: UsersService,
    private router: Router
    ) { 
    if ( this._authService.validToken() )
      this.router.navigate(["/products"]);
  }

  ngOnInit(): void {
  }

  onRegistroForm(): void{
    this.user = new User(0,"","","");
    this.errnor = "";
  	this.registroform = !this.registroform;
  }

  onRegistro(): void{
    this._usersService.Register(this.user).subscribe(
      resp => {
        if (resp.error)
          this.errnor = "Campo invalido/Correo duplicado.";
        else
          this.onRegistroForm();
      },
      error => {
        this.errnor = "Error con el servidor";
      }
    );
  }

  onLogin(): void{
    this._authService.Login(this.user).subscribe(
      resp =>  {
        if (resp.token) {
          this._authService.setToken(resp.token);
          this.router.navigate(["/products"]);
        }else{
            this.errnor = "Error con el servidor.";
        }
      },
      error => {
        if (error.status == 401)
          this.errnor = "Usuario/Contraseña Incorrectos.";
        else
          this.errnor = "Error con el servidor";
          console.log(error);
      }
    );
  }

}
