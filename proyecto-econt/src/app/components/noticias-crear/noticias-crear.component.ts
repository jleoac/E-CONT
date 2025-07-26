import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-noticias-crear',
  templateUrl: './noticias-crear.component.html',
  styleUrls: ['./noticias-crear.component.css'],
  providers: [NewsService, UploadService]
})

export class NoticiasCrearComponent implements OnInit{

  public title: string;
  public newNews: News;
  public save_news: any;
  public status: string | undefined;
  public filesToUpload_1: Array<File>;
  public url_1: string;

  constructor(
    private _newsService: NewsService,
    private _uploadServiceNews: UploadService
  ){
    this.title = "Crear nueva noticia";
    const fecha: Date = new Date("23/11/1980")  
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio: number = fecha.getFullYear();
    const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    this.newNews = new News('',fechaFormateada, '', '', '', '', 'http://localhost:4200/noticias-publico', '');
    this.filesToUpload_1 = [];
    console.log("Archivo a subir:", this.filesToUpload_1);
    this.url_1 = Global.url;    
  }

  ngOnInit(): void {

  }

  onSubmit(form: any) {

    //Guardar datos básicos
    console.log(this.newNews);

    this._newsService.saveNews(this.newNews).subscribe(

      response => {
        if (response.newNews) {

          //Subir la imágen
          if (this.filesToUpload_1.length >= 1) {
            this._uploadServiceNews.makeFileRequest(Global.url +
              "upload-image-news/" +
              response.newNews._id, [], this.filesToUpload_1, 'image')
              .then((result: any) => {

                this.save_news = result.newNews;

                this.status = 'success';
                form.reset();
                console.log(this.status);
                console.log("Imagen_a_subir", Global.url +
                  "upload-image-news/" +
                  response.newNews._id, [], this.filesToUpload_1, 'image');
              });
          } else {
            this.save_news = response.newNews;
            this.status = 'success';
            form.reset();
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
    this.filesToUpload_1 = <Array<File>>fileInput.target.files;
    console.log("Archivo a subir:", this.filesToUpload_1);
  }

}
