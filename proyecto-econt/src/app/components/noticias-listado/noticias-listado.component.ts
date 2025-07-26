import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-noticias-listado',
  templateUrl: './noticias-listado.component.html',
  styleUrls: ['./noticias-listado.component.css'],
  providers: [NewsService]
})
export class NoticiasListadoComponent implements OnInit{

  public news: News[] | undefined;
  public url_1: string;
  
  constructor(
    private _newsService: NewsService
  ){
    this.url_1 = Global.url;
  }

  ngOnInit(): void {
    this.getNewss();
  }

  getNewss(){
    this._newsService.getNewss().subscribe(
      response => {
        if(response.news){
          this.news = response.news;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Para subir al inicio de la página
  scrollToTop(): void {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50); // pequeño retraso para que Angular cargue antes de hacer scroll
  }

}
