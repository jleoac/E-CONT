import { Component, OnInit} from '@angular/core';
import { Admin } from 'src/app/models/admin';
import {AdminService } from 'src/app/services/admin.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-login-editar',
  templateUrl: './login-editar.component.html',
  styleUrls: ['./login-editar.component.css'],
  providers: [AdminService]
})
export class LoginEditarComponent implements OnInit {

  public title: string;
  public url: string;
  public admin: Admin [] | undefined;

  constructor(
      private _adminService: AdminService,
      
    ) {
      this.title = "Administrador de Usuarios";
      this.url = Global.url;
    }
    
    ngOnInit(): void {
      this.getAdmins();
    };
    
    getAdmins(){
      this._adminService.getAdmins().subscribe(
        response => {
          if(response.admin){
            this.admin = response.admin.sort((a: any, b: any) => {
            return new Date(b.fecha_mensaje).getTime() - new Date(a.fecha_mensaje).getTime();
          });
            console.log(this.admin);
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  
    deleteAdmin(id: any) {
      if (confirm('¿Estás seguro de borrar este usuario?')) {
        this._adminService.deleteAdmin(id).subscribe(() => {
          this.admin = this.admin?.filter(msg => msg._id !== id) || [];
        });
      }
    }

}
