import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-"cursos-inscripcion"',
  templateUrl: './cursos-inscripcion.component.html',
  styleUrls: ['./cursos-inscripcion.component.css'],
  providers: [ProjectService]
})
export class CursosInscripcionComponent implements OnInit {

  public projects: Project[] | undefined;
  public newProject: Project | undefined;
  public url: string;
  
  constructor(
    private _projectService: ProjectService
  ){
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
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

  getProjects() {
  this._projectService.getProjects().subscribe(
    response => {
      if (response.projects) {
        this.projects = response.projects.sort((b: { start_date: string | number | Date; }, a: { start_date: string | number | Date; }) => {
          return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        });
      }
    },
    error => {
      console.log(<any>error);
    }
  );
  }

  //Para subir al inicio de la página
  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50); // pequeño retraso para que Angular cargue antes de hacer scroll
  }

}
