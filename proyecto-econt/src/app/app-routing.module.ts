import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CapacitacionRegistrosDetComponent } from './components/capacitacion-registros-det/capacitacion-registros-det.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { NoticiasCrearComponent } from './components/noticias-crear/noticias-crear.component';
import { NoticiasListadoComponent } from './components/noticias-listado/noticias-listado.component';
import { NoticiasDetalleComponent } from './components/noticias-detalle/noticias-detalle.component';
import { NoticiasEditarComponent } from './components/noticias-editar/noticias-editar.component';
import { BuzonComponent } from './components/buzon/buzon.component';
import { LoginCrearComponent } from './components/login-crear/login-crear.component';
import { LoginEditarComponent } from './components/login-editar/login-editar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'capacitacion-crear', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'capacitacion-listado', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'capacitacion-registros-det', component: CapacitacionRegistrosDetComponent, canActivate: [AuthGuard]},
  {path: 'capacitacion-detalle/:id', component: DetailComponent, canActivate: [AuthGuard]},
  {path: 'capacitacion-editar/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'noticias-crear', component: NoticiasCrearComponent, canActivate: [AuthGuard]},
  {path: 'noticias-listado', component: NoticiasListadoComponent, canActivate: [AuthGuard]},
  {path: 'noticias-detalle/:id', component: NoticiasDetalleComponent, canActivate: [AuthGuard]},
  {path: 'noticias-editar/:id', component: NoticiasEditarComponent, canActivate: [AuthGuard]},
  {path: 'buzon', component: BuzonComponent, canActivate: [AuthGuard]},
  {path: 'login-crear', component: LoginCrearComponent, canActivate: [AuthGuard]},
  {path: 'login-editar', component: LoginEditarComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
