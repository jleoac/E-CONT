import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';

@Component({
  selector: 'app-login-crear',
  templateUrl: './login-crear.component.html',
  styleUrls: ['./login-crear.component.css'],
  providers: [AdminService, UploadService]
})
export class LoginCrearComponent implements OnInit{

  form!: FormGroup;

  public title: string;
  public newAdmin: Admin;
  public save_admin: any;
  public status: string | undefined;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _adminService: AdminService,
    private _uploadServiceAdmin: UploadService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ){
    this.title = 'Crear nuevo usuario';
    const fecha: Date = new Date("23/11/1980")  
        const dia: number = fecha.getDate();
        const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
        const anio: number = fecha.getFullYear();
        const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
        this.newAdmin = new Admin('', '', '', '', fechaFormateada);
        this.filesToUpload = [];
        console.log("Archivo a subir:", this.filesToUpload);
        this.url = Global.url;
  }

  ngOnInit(): void {
      this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s:¿?¡!'-_()*"{}¨´ü]{8,}$/)]]
      });
  }

  getAdmin(id: any){
      this._adminService.getAdmin(id).subscribe(
        response => {
          this.newAdmin = response.newAdmin;
        },
        error => {
          console.log(<any>error);
        }
      )
  }
  
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  
    const formValues = this.form.value;
  
    this.newAdmin.email = formValues.email;
    this.newAdmin.password = formValues.password;
  
    const today = new Date();
    // Restar un día
    today.setDate(today.getDate());
  
    // Formatear como 'yyyy-mm-dd'
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
    const dd = String(today.getDate()).padStart(2, '0');
  
    this.newAdmin.fecha_usuario = `${yyyy}-${mm}-${dd}`;
  
    this._adminService.saveAdmin(this.newAdmin).subscribe(
      response => {
        if (response.newAdmin) {

        //Subir la imágen
        if (this.filesToUpload.length >= 1) {
          this._uploadServiceAdmin.makeFileRequest(Global.url +
            "upload-image-admin/" +
            response.newAdmin._id, [], this.filesToUpload, 'image')
            .then((result: any) => {

              this.save_admin = result.newAdmin;

              this.status = 'success';
                this.form.reset();
                console.log(this.status);
                console.log("Imagen_a_subir", Global.url +
                  "upload-image-admin/" +
                  response.newAdmin._id, [], this.filesToUpload, 'image');
              });
          } else {
            this.save_admin = response.newAdmin;
            this.status = 'success';
            this.form.reset();
          }

        } else {
          this.status = 'failed';
          console.log(this.status);

        }
      },
      error => {
          console.error(error);
          this.status = 'failed';
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log("Archivo a subir:", this.filesToUpload);
  }
}
