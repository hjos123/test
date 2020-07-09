import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopage',
  templateUrl: './nopage.component.html',
  styleUrls: ['./nopage.component.css']
})
export class NopageComponent{

  constructor(
  	private router: Router
  	) { }

}
