import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-noticias-publico',
  templateUrl: './noticias-publico.component.html',
  styleUrls: ['./noticias-publico.component.css'],
  providers: [NewsService]
})
export class NoticiasPublicoComponent implements OnInit {

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
  
}
