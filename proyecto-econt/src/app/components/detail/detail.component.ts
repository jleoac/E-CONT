import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public newProject: Project;
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
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
    this.newProject = new Project('', '', '', fechaFormateada, fechaFormateada, '', '');
    this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this.getProject(id);
    });
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.newProject = response.newProject;
      },
      error => {
        console.log(<any>error);
      }
      
    )
  }

  //Metodo del componente para confirmar borrado del proyecto
  setConfirm(confirm: any){
    this.confirm = confirm;
  }

  //Método del componente para borrar definitivamente el proyecto
  deleteProject(id: any){
    this._projectService.deleteProject(id).subscribe(
      response => {

        if(response.newProject){
          this._router.navigate(['/capacitacion-listado']);
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
