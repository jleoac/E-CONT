import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{

  public url_1: string;

  constructor(
    ){
      this.url_1 = Global.url;
    }

  ngOnInit(): void {
    
  }

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50); // pequeño retraso para que Angular cargue antes de hacer scroll
  }

}

