import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	private url = "http://127.0.0.1:8000/api/";

  constructor(
  	private http: HttpClient
  ) { }

  Register(user: User): Observable<any>{
  	return this.http.post(this.url + "register", user);
  }
}
