import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from '../models/admin';
import { Global } from './global';

@Injectable()
export class AdminService{
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
    saveAdmin(newAdmin: Admin): Observable<any>{
        let params = JSON.stringify(newAdmin);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-admin', params, {headers: headers});
    }

    //Método para obtener todos los registrados en la pestaña "Registros" de nuestra web
    getAdmins(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'admins', {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getAdmin(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'admin/'+id, {headers: headers});
    }

    //Método para borrar un proyecto desde nuestra web
    deleteAdmin(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'admin/'+id, {headers: headers});
    }

    //Método para editar un proyecto desde nuestra web
    updateAdmin(newAdmin: any): Observable<any>{
        let params = JSON.stringify(newAdmin);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'admin/'+newAdmin._id, params, {headers: headers});
    }

    getAdminByEmail(email: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}admin-by-email/${email}`, { headers });
    }

}