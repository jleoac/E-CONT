import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-noticias-editar',
  templateUrl: '../noticias-crear/noticias-crear.component.html',
  styleUrls: ['./noticias-editar.component.css'],
  providers: [NewsService, UploadService]
})
export class NoticiasEditarComponent implements OnInit {
  public url_1: string;
  public title: string;
  public newNews: News;
  public save_news: any;
  public status: string | undefined;
  public filesToUpload: Array<File>;

  constructor(
    private _newsService: NewsService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url_1 = Global.url;
    this.title = "Editar noticia";
    const fecha: Date = new Date("01/01/2023")  
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio: number = fecha.getFullYear();
    const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    this.newNews = new News('', '', '', fechaFormateada, fechaFormateada, '', '', '');
    this.filesToUpload = [];

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

  onSubmit(form: any) {

    //Guardar datos básicos
    console.log(this.newNews);

    this._newsService.updateNews(this.newNews).subscribe(

      response => {
        if (response.newNews) {

          //Subir la imágen

          if(this.filesToUpload.length >= 1){
            this._uploadService.makeFileRequest(Global.url +
              "upload-image-news/" +
              response.newNews._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                
                this.save_news = result.newNews;
                this.status = 'success';
              });
          }else{
            this.save_news = response.newNews;
            this.status = 'success';
          }
          

        } else {
          this.status = 'failed';
          console.log(this.status);
          
        }
      },
      error => {
        console.log(<any>error);
      }

    );

  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

