import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private token_name: string = "api_token";
	private url: string = "http://127.0.0.1:8000/api/";
	isLogin = new EventEmitter<boolean>(false);

  constructor(
  	private http: HttpClient
  	) { }

	setToken(token: string): void{
		this.isLogin.emit(true);
		localStorage.setItem(this.token_name, token);
	}

	getToken(): string{
		return localStorage.getItem(this.token_name);
	}

	deleteToken(): void{
		this.isLogin.emit(false);
		localStorage.removeItem(this.token_name);
	}

	Login(user: User): Observable<any> {
		return this.http.post(this.url + "login", user);
	}

	Logout(): Observable<any>{
		let token = localStorage.getItem(this.token_name);
		const headers = new HttpHeaders()
    		.set("Content-Type", "application/json")
    		.set("Authorization", "Bearer " + token);
		
		return this.http.get(this.url + "logout", {headers: headers} );
	}

	validToken(): boolean{
		let token = localStorage.getItem(this.token_name);
		if ( !isNullOrUndefined(token) )
			return true;
		else
			return false; 
	}

}
