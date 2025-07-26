import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CarouselModule } from './components/homepage/carousel/carousel.module';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { CursosInscripcionComponent } from './components/cursos-inscripcion/cursos-inscripcion.component';
import { NoticiasCrearComponent } from './components/noticias-crear/noticias-crear.component';
import { NoticiasEditarComponent } from './components/noticias-editar/noticias-editar.component';
import { NoticiasDetalleComponent } from './components/noticias-detalle/noticias-detalle.component';
import { NoticiasListadoComponent } from './components/noticias-listado/noticias-listado.component';
import { CapacitacionRegistrosDetComponent } from './components/capacitacion-registros-det/capacitacion-registros-det.component';
import { NoticiasPublicoComponent } from './components/noticias-publico/noticias-publico.component';
import { NoticiasLecturaComponent } from './components/noticias-lectura/noticias-lectura.component';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { AddDayPipe } from './pipes/add-day.pipe';
import { BuzonComponent } from './components/buzon/buzon.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServiciosEmprendedoresComponent } from './components/servicios-emprendedores/servicios-emprendedores.component';
import { ServiciosMipymesComponent } from './components/servicios-mipymes/servicios-mipymes.component';
import { LoginCrearComponent } from './components/login-crear/login-crear.component';
import { LoginEditarComponent } from './components/login-editar/login-editar.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    LoginComponent,
    HomepageComponent,
    SubscriptionComponent,
    CursosInscripcionComponent,
    NoticiasCrearComponent,
    NoticiasEditarComponent,
    NoticiasDetalleComponent,
    NoticiasListadoComponent,
    CapacitacionRegistrosDetComponent,
    NoticiasPublicoComponent,
    NoticiasLecturaComponent,
    Nl2brPipe,
    AddDayPipe,
    BuzonComponent,
    ServiciosComponent,
    ServiciosEmprendedoresComponent,
    ServiciosMipymesComponent,
    LoginCrearComponent,
    LoginEditarComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
