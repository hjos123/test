import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../modules/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
	product: Product = new Product(0,"","","","","","","",0);
  time: string ="00:00";
  files: File [] = [];
  message: string = "";
  typeMessage: string = "alert-danger";

  constructor(
  	private router: Router,
    private _productsService: ProductsService
  	) { }

  onSubmit(): void{
    this.product.date_available = this.product.date_available +" "+ this.time;
    this._productsService.save(this.product).subscribe(
      resp => { 
        this.message = "Productos almacenado";
        this.typeMessage = "alert-success";
        this.product = new Product(0,"","","","","","","",0);
        this.time = "00:00";
        //console.log(resp);
        this.Subir(resp.idprod);
        window.scroll(0,0);
       },
      error => { 
        this.message = "Favor de validar los campos/error del servidor";
        this.typeMessage = "alert-danger";
        console.log(error); 
      }
    );
  }

  onSelect(event) {
  this.files.push(...event.addedFiles);
}
 
onRemove(event) {
  this.files.splice(this.files.indexOf(event), 1);
}
  
  Subir(idprod: string): void{
        for  (var i =  0; i <  this.files.length; i++)  
        {  
            const formData = new FormData();
            formData.append("image",  this.files[i]);
            formData.append("id_img",  i+"");
            formData.append("id_prod",  idprod);
            this._productsService.uploadImage(formData).subscribe(
                resp => { console.log(resp); },
                error => { console.log(error);  }
              );
        }
        this.files = [];
  }

}
