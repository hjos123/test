import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { NopageComponent } from './components/nopage/nopage.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{ path: '' , component: LoginComponent },
	{ path: 'products' , component: ProductsComponent, canActivate: [AuthGuard] },
	{ path: 'products/new' , component: NewproductComponent, canActivate: [AuthGuard] },
	{ path: '**' , component: NopageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
