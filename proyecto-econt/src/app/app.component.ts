import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loading: boolean = false;

  title = 'proyecto-angular';
  public url: string = Global.url;

  mostrarHeader1: boolean = true;
  userLoginOn: boolean = false;
  administratorLoginOn: boolean = false;
  menuAbierto: boolean = false;

  public adminLogged: any = {}; // 👈 aquí se guardará el admin logueado con imagen

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.menuAbierto = false;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.loading = false;
        }, 300); // Espera de 0.3 segundos
      }
    });
  }

  get flechaIcono(): string {
    return this.menuAbierto ? '▼' : '▶';
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenuYScroll() {
    this.scrollToTop();
    this.menuAbierto = false;
  }

  ngOnInit(): void {
    const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    const adminData = sessionStorage.getItem('adminData');

    if (isAdminLoggedIn === 'true' && adminData) {
      this.administratorLoginOn = true;
      this.adminLogged = JSON.parse(adminData); // 👈 admin con email, imagen, etc.
      console.log('Administrador cargado:', this.adminLogged); // debug
      this.cargarAdminData();
    }

  }

  cambiarBooleano(valor: boolean) {
    this.administratorLoginOn = valor;
  }

  // Para cerrar sesión del admin
  logout() {
    this.administratorLoginOn = false;
    this.userLoginOn = false;
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('adminData'); // 👈 importante: limpiar también los datos del admin
    this.router.navigate(['/homepage']);

    //Para mostrar loading
    this.loading = true; // Mostrar loader
    setTimeout(() => {
      // Lógica de cierre de sesión
      this.administratorLoginOn = false;
      this.userLoginOn = false;
      this.adminLogged = null;
      this.loading = false; // Ocultar loader
    }, 300); // Duración del loading: 1 segun
  }

  // Para volver al top al navegar
  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  // Obtener la URL de la imagen del admin
  getAdminImageUrl(): string {
  if (this.adminLogged?.image) {
    return `${this.url}get-image/${this.adminLogged.image}`;
  } else {
    return 'assets/img/default-profile.png'; // o imagen por defecto
  }
  }

  cargarAdminData(): void {
  const adminData = sessionStorage.getItem('adminData');
  if (adminData) {
    this.adminLogged = JSON.parse(adminData);
  }
  }

  goHome() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/homepage']);
  });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
  
  //Para salir del nav:
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const headerElement = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');

    const isClickInsideHeader = headerElement?.contains(clickedElement);
    const isClickInsideToggle = menuToggle?.contains(clickedElement);

    if (!isClickInsideHeader && !isClickInsideToggle && this.menuAbierto) {
      this.menuAbierto = false;
      this.cd.detectChanges(); // 👈 Fuerza actualización de Angular
    }
  } 
}
