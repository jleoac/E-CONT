import { Component, OnInit} from '@angular/core';
import { Buzon } from 'src/app/models/buzon';
import { BuzonService } from 'src/app/services/buzon.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css'],
  providers: [BuzonService]
})
export class BuzonComponent implements OnInit{
  
  public title: string;
  public url: string;
  public buzon: Buzon [] | undefined;
    
  
  constructor(
    private _buzonService: BuzonService,
    
  ) {
    this.title = "Buzon de Mensajes";
    this.url = Global.url;
  }
  
  ngOnInit(): void {
    this.getBuzons();
  };
  
  getBuzons(){
    this._buzonService.getBuzons().subscribe(
      response => {
        if(response.buzon){
          this.buzon = response.buzon.sort((a: any, b: any) => {
          return new Date(b.fecha_mensaje).getTime() - new Date(a.fecha_mensaje).getTime();
        });
          console.log(this.buzon);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteBuzon(id: any) {
    if (confirm('¿Estás seguro de borrar este mensaje?')) {
      this._buzonService.deleteBuzon(id).subscribe(() => {
        this.buzon = this.buzon?.filter(msg => msg._id !== id) || [];
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

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    const fechaCelda = celdas[0]; // Columna 0: Fecha y hora de mensaje

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
  });

  // Convertir tabla modificada a Excel
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tablaClon);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Mensajes': worksheet },
    SheetNames: ['Mensajes']
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data: Blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });

  FileSaver.saveAs(data, 'Mensajes.xlsx');
}




}
