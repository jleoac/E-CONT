import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de Angular';
    }

    //Método para grabar un proyecto desde nuestra web
    saveProject(newProject: Project): Observable<any>{
        let params = JSON.stringify(newProject);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-project', params, {headers: headers});
    }

    //Método para obtener todos los proyectos en la pestaña "PROYECTOS" de nuestra web
    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'projects', {headers: headers});
    }

    //Método para obtener un solo proyecto con un id específico desde nuestra web
    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'project/'+id, {headers: headers});
    }

    //Método para borrar un proyecto desde nuestra web
    deleteProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'project/'+id, {headers: headers});
    }

    //Método para editar un proyecto desde nuestra web
    updateProject(newProject: any): Observable<any>{
        let params = JSON.stringify(newProject);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'project/'+newProject._id, params, {headers: headers});
    }
}