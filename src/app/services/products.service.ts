import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../modules/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
	private url = "http://127.0.0.1:8000/api/";

  constructor(
  	private http: HttpClient,
  	private _authService: AuthService
  	) {}

 list(): Observable<any[]>{
   const headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this._authService.getToken());
        
 	return this.http.get<any[]>(this.url + "products", {headers: headers});
 }

  save(product: Product): Observable<any>{
    const headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this._authService.getToken());

  	return this.http.post(this.url + "products/save", product ,{headers: headers} );
  }

  uploadImage(formData: FormData): Observable<any>{
    const headers = new HttpHeaders()
        .set("Authorization", "Bearer " + this._authService.getToken());
    return this.http.post(this.url + "products/uploadImage", formData , {headers: headers} );
  }

}
