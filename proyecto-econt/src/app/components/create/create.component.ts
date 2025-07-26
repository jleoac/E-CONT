import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})

export class CreateComponent implements OnInit {

  public title: string;
  public newProject: Project;
  public save_project: any;
  public status: string | undefined;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear nueva capacitación";
    const fecha: Date = new Date("01/01/2023")  
    const dia: number = fecha.getDate();
    const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
    const anio: number = fecha.getFullYear();
    const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    this.newProject = new Project('', '', '', fechaFormateada, fechaFormateada, '', '');
    this.filesToUpload = [];
    console.log("Archivo a subir:", this.filesToUpload);
    this.url = Global.url;

  }

  ngOnInit(): void {

  }

  onSubmit(form: any) {

    //Guardar datos básicos
    console.log(this.newProject);

    this._projectService.saveProject(this.newProject).subscribe(

      response => {
        if (response.newProject) {

          //Subir la imágen
          if (this.filesToUpload.length >= 1) {
            this._uploadService.makeFileRequest(Global.url +
              "upload-image/" +
              response.newProject._id, [], this.filesToUpload, 'image')
              .then((result: any) => {

                this.save_project = result.newProject;

                this.status = 'success';
                form.reset();
                console.log(this.status);
                console.log(Global.url +
                  "upload-image/" +
                  response.newProject._id, [], this.filesToUpload, 'image');
              });
          } else {
            this.save_project = response.newProject;
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
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
