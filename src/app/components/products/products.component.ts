import { Component, OnInit } from '@angular/core';
import {Product} from '../../modules/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products: Product[];

  constructor(
  	private _productsService: ProductsService
  	) { }

  ngOnInit(): void {
    this._productsService.list().subscribe(
      resp => this.products = resp ,
      error => console.log(error)
      );
  }

}
