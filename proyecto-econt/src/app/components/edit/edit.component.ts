import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{

  public url: string;
  public title: string;
  public newProject: Project;
  public save_project: any;
  public status: string | undefined;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.title = "Editar capacitación";
    const fecha: Date = new Date("01/01/2023")  
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio: number = fecha.getFullYear();
    const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    this.newProject = new Project('', '', '', fechaFormateada, fechaFormateada, '', '');
    this.filesToUpload = [];

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

  onSubmit(form: any) {

    //Guardar datos básicos
    console.log(this.newProject);

    this._projectService.updateProject(this.newProject).subscribe(

      response => {
        if (response.newProject) {

          //Subir la imágen

          if(this.filesToUpload.length >= 1){
            this._uploadService.makeFileRequest(Global.url +
              "upload-image/" +
              response.newProject._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                
                this.save_project = result.newProject;
                this.status = 'success';
              });
          }else{
            this.save_project = response.newProject;
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
