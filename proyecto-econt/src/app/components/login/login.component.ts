import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';
import { AdminService } from 'src/app/services/admin.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AdminService]
})
export class LoginComponent implements OnInit {
  public url: string = Global.url;
  public errorMessage: string = '';
  public successMessage: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appComponent: AppComponent,
    private loginService: LoginService,
    private _adminService: AdminService,
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }

    const credentials = {
      email: this.email.value || '',
      password: this.password.value || ''
    };

    this.loginService.login(credentials).subscribe(
  response => {
    if (response.user) {

      const email = response.user.email;

      // Segunda petición: obtener datos completos del admin
      this._adminService.getAdminByEmail(email).subscribe(
        adminResponse => {
          if (adminResponse.admin) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            sessionStorage.setItem('adminData', JSON.stringify(adminResponse.admin)); // 👈 ahora sí con imagen
            this.appComponent.cambiarBooleano(true);
            this.successMessage = 'Inicio de sesión exitoso';
            this.errorMessage = '';
            this.loginForm.reset();
             this.appComponent.cargarAdminData(); 
            this.router.navigateByUrl('/homepage');
          } else {
            this.errorMessage = 'No se pudo obtener los datos del administrador';
          }
        },
        error => {
          this.errorMessage = 'Error al obtener los datos del administrador';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Credenciales inválidas';
    }
  },
  error => {
    this.errorMessage = error?.error?.message || 'Error al iniciar sesión';
    console.error(error);
  }
);

  }

  logout(): void {
    sessionStorage.removeItem('isAdminLoggedIn');
    this.router.navigate(['/login']);
  }
}
