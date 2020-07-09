import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	isLogin: boolean = false;

  constructor(
  	private _authService: AuthService,
  	private router: Router
  	) { 
    this.isLogin = this._authService.validToken();
  }

  ngOnInit(): void {
  	this._authService.isLogin.subscribe(
  		resp => this.isLogin = resp 
  	);
  }

  onLogout(): void{
  	this._authService.Logout().subscribe(
      resp => {
          this._authService.deleteToken();
          this.router.navigate(["/"]);
      } , 
      error => console.log(error)
    );
  }

}
