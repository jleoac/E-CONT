/*La siguiente página web es creada en base a Angular y Tipescript y sirve para que se actualice automáticamente la 
página ante cualquier cambio en el código, esto incluye: estructura html, estilos css y backend con typescript
Corre escibiendo la siguiente instrucción en Cygwin64 Terminal (símbolo del sistema), en este caso:
cd D:
cd "Leonardo A"
cd "PROYECTO_WEB_ECONT"
cd "proyecto-econt"
ng serve

Nota: puede funcionar sin internet*/

/*Para crear un nuevo componente:
1. En simbolo del sistema me ubico en la carpeta donde quiero crear el componete
    cd D:
    cd "Leonardo A"
    cd "PROYECTO_WEB_ECONT"
    cd "proyecto-econt"
2. digitar el siguiente código: "ng g component components/noticias-crear" (al final pongo el nombre que deseo del component)*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public web: string;

  constructor(){
    this.title = "E-CONT";
    this.subtitle = "Estudio Económico, Contable y Tributario";
    this.web = "http://localhost:4200/homepage"
  }

  ngOnInit(): void {
    
  }

}
