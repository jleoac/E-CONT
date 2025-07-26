import { Component } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Nl2brPipe } from 'src/app/pipes/nl2br.pipe';


@Component({
  selector: 'app-noticias-lectura',
  templateUrl: './noticias-lectura.component.html',
  styleUrls: ['./noticias-lectura.component.css'],
  providers: [NewsService, Nl2brPipe]
})
export class NoticiasLecturaComponent {
public url: string;
  public newNews: News;
  public confirm: boolean;

  constructor(
    private _newsService: NewsService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;

    // Obtener día, mes y año
    const fecha: Date = new Date("01/01/2023")  
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio: number = fecha.getFullYear();
    const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    this.newNews = new News('',fechaFormateada, '', '', '', '', '', '');
    this.confirm = false;
  }
    
  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getNews(id);
    });
  }
    
  getNews(id: any){
    this._newsService.getNews(id).subscribe(
      response => {
        this.newNews = response.newNews;
      },
      error => {
        console.log(<any>error);
      }
          
    )
  }

  goBack() {
    window.history.back(); // Esto regresa a la página anterior
  }

  //Para subir al inicio de la página
  scrollToTop(): void {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50); // pequeño retraso para que Angular cargue antes de hacer scroll
  }
}
