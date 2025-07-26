import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginCrearComponent } from "./components/login-crear/login-crear.component";
import { LoginEditarComponent } from "./components/login-editar/login-editar.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { CursosInscripcionComponent } from "./components/cursos-inscripcion/cursos-inscripcion.component";
import { SubscriptionComponent } from "./components/subscription/subscription.component";
import { CapacitacionRegistrosDetComponent } from "./components/capacitacion-registros-det/capacitacion-registros-det.component";
import { NoticiasCrearComponent } from "./components/noticias-crear/noticias-crear.component";
import { NoticiasListadoComponent } from "./components/noticias-listado/noticias-listado.component";
import { NoticiasDetalleComponent } from "./components/noticias-detalle/noticias-detalle.component";
import { NoticiasEditarComponent } from "./components/noticias-editar/noticias-editar.component";
import { NoticiasPublicoComponent } from "./components/noticias-publico/noticias-publico.component";
import { NoticiasLecturaComponent } from "./components/noticias-lectura/noticias-lectura.component";
import { BuzonComponent } from "./components/buzon/buzon.component";
import { ServiciosComponent } from "./components/servicios/servicios.component";
import { ServiciosEmprendedoresComponent } from "./components/servicios-emprendedores/servicios-emprendedores.component";
import { ServiciosMipymesComponent } from "./components/servicios-mipymes/servicios-mipymes.component";

//Estas rutas van como parte de la url dentro del link:
const appRoutes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'homepage', component: HomepageComponent},
    {path: 'sobre-nosotros', component: AboutComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'capacitacion-crear', component: CreateComponent},
    {path: 'capacitacion-listado', component: ProjectsComponent},
    {path: 'capacitacion-detalle/:id', component: DetailComponent},
    {path: 'capacitacion-editar/:id', component: EditComponent},
    {path: 'capacitacion-registros-det', component: CapacitacionRegistrosDetComponent},
    {path: 'cursos-listado', component: CursosInscripcionComponent},
    {path: 'cursos-registro', component: SubscriptionComponent},
    {path: 'cursos-registro/:topic/:start_date/:end_date/:description/:coach/:image', component: SubscriptionComponent},
    {path: 'noticias-crear', component: NoticiasCrearComponent},
    {path: 'noticias-listado', component: NoticiasListadoComponent},
    {path: 'noticias-detalle/:id', component: NoticiasDetalleComponent},
    {path: 'noticias-editar/:id', component: NoticiasEditarComponent},
    {path: 'noticias-publico', component: NoticiasPublicoComponent},
    {path: 'noticias-lectura/:id', component: NoticiasLecturaComponent},
    {path: 'buzon', component: BuzonComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login-crear', component: LoginCrearComponent},
    {path: 'login-editar/:id', component: LoginEditarComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'servicios-emprendedores', component: ServiciosEmprendedoresComponent},
    {path: 'servicios-mipymes', component: ServiciosMipymesComponent},
    {path: '**', component: ErrorComponent}
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
