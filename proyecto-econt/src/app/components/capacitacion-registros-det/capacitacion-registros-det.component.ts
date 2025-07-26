import { Component, OnInit} from '@angular/core';
import { Register } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { AddDayPipe } from 'src/app/pipes/add-day.pipe';


@Component({
  selector: 'app-capacitacion-registros-det',
  templateUrl: './capacitacion-registros-det.component.html',
  styleUrls: ['./capacitacion-registros-det.component.css'],
  providers: [RegisterService, AddDayPipe]
})
export class CapacitacionRegistrosDetComponent implements OnInit{

  public title: string;
  public url: string;
  public register: Register[] | undefined;

  constructor(
    private _registerService: RegisterService,
    
  ){
    this.title = "Registro de Capacitaciones";
    this.url = Global.url;

  }

  ngOnInit(): void {
    this.getRegisters();
  }

  getRegisters(){
    this._registerService.getRegisters().subscribe(
      response => {
        if(response.register){
          this.register = response.register;
          console.log(this.register);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteRegister(id: any) {
    if (confirm('¿Estás seguro de borrar este registro?')) {
      this._registerService.deleteRegister(id).subscribe(() => {
        this.register = this.register?.filter(msg => msg._id !== id) || [];
      });
    }
  }
  
// Método para exportar la tabla a Excel
  exportarExcel(): void {
  const tabla: HTMLElement | null = document.querySelector('table');
  if (!tabla) return;

  // Clonar la tabla para no modificar la original
  const tablaClon = tabla.cloneNode(true) as HTMLElement;

  // Obtener todas las filas del cuerpo de la tabla clonada
  const filas = tablaClon.querySelectorAll('tbody tr');

  // Índices de columnas: 2, 3, 5 y 7 (0-indexed)
  const columnasFecha = [1, 2, 5];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    const fechaCelda = celdas[8];

    const textoFecha = fechaCelda.textContent?.trim();
    if (!textoFecha) return;

    // Parsear fecha manualmente en formato dd/MM/yyyy HH:mm:ss
    const [fechaParte, horaParte] = textoFecha.split(' ');
    const [diaStr, mesStr, anioStr] = fechaParte.split('/');
    const [horaStr, minStr, segStr] = horaParte.split(':');

    const dia = parseInt(diaStr, 10) - 1;
    const mes = parseInt(mesStr, 10) - 1; // Mes en Date es 0-indexado
    const anio = parseInt(anioStr, 10);
    const hora = parseInt(horaStr, 10);
    const minuto = parseInt(minStr, 10);
    const segundo = parseInt(segStr, 10);

    const fecha = new Date(anio, mes, dia, hora, minuto, segundo);

    // Sumar 1 día correctamente
    fecha.setDate(fecha.getDate() + 1);

    // Formatear la nueva fecha
    const nuevaFecha = fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');

    // Reemplazar la celda con la nueva fecha
    fechaCelda.textContent = nuevaFecha;

    columnasFecha.forEach(index => {
      const celda = celdas[index];
      const texto = celda?.textContent?.trim();
      if (!texto) return;

      // Intentar parsear fecha manualmente
      const partes = texto.split('/');
      if (partes.length === 3) {
        // Asegurarse que las partes están en formato dd/MM/yyyy
        let [MM, dd, yyyy] = partes;

        // Asegura 2 dígitos
        dd = dd.padStart(2, '0');
        MM = MM.padStart(2, '0');
        yyyy = yyyy.padStart(4, '0');

        const fecha = new Date(`${yyyy}-${MM}-${dd}T00:00:00`);

        // Formatear la nueva fecha
        if (!isNaN(fecha.getTime())) {
          const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).replace(',','');

          // Reemplazar la celda con la nueva fecha
          celda.textContent = fechaFormateada;
        }
      }
    });
  });

  // Convertir tabla modificada a Excel
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablaClon);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Registros_Capacitaciones': worksheet },
    SheetNames: ['Registros_Capacitaciones']
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data: Blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });

  FileSaver.saveAs(data, 'Registros_Capacitaciones.xlsx');
}


}
