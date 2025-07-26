import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Register } from '../models/register';
import { Global } from './global';

@Injectable()
export class RegisterService{
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
    saveRegister(newRegister: Register): Observable<any>{
        let params = JSON.stringify(newRegister);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-register', params, {headers: headers});
    }

    //Método para obtener todos los registrados en la pestaña "Registros" de nuestra web
    getRegisters(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'registers', {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getRegister(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'register/'+id, {headers: headers});
    }

    //Método para borrar un proyecto desde nuestra web
    deleteRegister(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'register/'+id, {headers: headers});
    }

    //Método para editar un proyecto desde nuestra web
    updateRegister(newRegister: any): Observable<any>{
        let params = JSON.stringify(newRegister);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'register/'+newRegister._id, params, {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'project/'+id, {headers: headers});
    }
}