import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { News } from '../models/news';
import { Global } from './global';

@Injectable()
export class NewsService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular'
    }

    //Método para grabar un registro desde nuestra web
    saveNews(newNews: News): Observable<any> {
        let params = JSON.stringify(newNews);

        // Agregar el header de autorización
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')

        return this._http.post(this.url + 'save-news', params, { headers: headers });
    }

    //Método para obtener todos los registrados en la pestaña "Registros" de nuestra web
    getNewss(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'newss', {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getNews(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'news/'+id, {headers: headers});
    }

    //Método para borrar un proyecto desde nuestra web
    deleteNews(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'news/'+id, {headers: headers});
    }

    //Método para editar un proyecto desde nuestra web
    updateNews(newNews: any): Observable<any>{
        let params = JSON.stringify(newNews);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'news/'+newNews._id, params, {headers: headers});
    }    

}