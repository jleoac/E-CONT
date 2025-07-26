import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Buzon } from '../models/buzon';
import { Global } from './global';

@Injectable()
export class BuzonService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular';
    }

    //Método para grabar un registro desde nuestra web
    saveBuzon(newBuzon: Buzon): Observable<any>{
        let params = JSON.stringify(newBuzon);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-buzon', params, {headers: headers});
    }

    //Método para obtener todos los registrados en la pestaña "Registros" de nuestra web
    getBuzons(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'buzons', {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getBuzon(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'buzon/'+id, {headers: headers});
    }

    //Método para borrar un proyecto desde nuestra web
    deleteBuzon(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'buzon/'+id, {headers: headers});
    }

    //Método para editar un proyecto desde nuestra web
    updateBuzon(newBuzon: any): Observable<any>{
        let params = JSON.stringify(newBuzon);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'buzon/'+newBuzon._id, params, {headers: headers});
    }

}