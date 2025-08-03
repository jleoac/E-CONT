import { Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { Buzon } from 'src/app/models/buzon';
import { BuzonService } from 'src/app/services/buzon.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { Nl2brPipe } from 'src/app/pipes/nl2br.pipe';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [NewsService, BuzonService, UploadService, Nl2brPipe]
})
export class HomepageComponent implements OnInit{

  esMovil: boolean = false;

  @ViewChild('panel') panelRef!: ElementRef;
  panelAbierto = false;

  togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }

  form!: FormGroup;

    public news: News[] = [];
    public images: any[] = []; // Solo las primeras 6 para el carousel
    public topic: any[] = [];
    public url_1: string;
    public newBuzon: Buzon;
    public save_buzon: any;
    public status: string | undefined;  

    constructor(
      private _newsService: NewsService,
      private _buzonService: BuzonService,
      private _route: ActivatedRoute,
      private fb: FormBuilder
    ) {
      const fecha: Date = new Date("01/01/2023")  
      const dia: number = fecha.getDate();
      const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
      const anio: number = fecha.getFullYear();
      const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
      this.newBuzon = new Buzon('','','', '', '', fechaFormateada);          
      this.url_1 = Global.url;

    }

    ngOnInit(): void {
      this.checkTamanioPantalla();
      this.getNewss();
      this._route.params.subscribe(params =>{
          let id = params['id'];
          this.getBuzon(id);
        });
        
        this.form = this.fb.group({
          name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,}$/)]],
          mail: ['', [Validators.required, Validators.email]],
          fone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,}$/)]],
          mensaje: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s:¿?¡!'-_()*"{}¨´ü]{15,}$/)]]
        });
    }

    title = 'carousel';

    getNewss() {
      this._newsService.getNewss().subscribe(
        response => {
          if (response.news) {
            this.news = response.news;

            // Guardar las primeras 4 noticias en `images`
            this.images = this.news.slice(0, 8).map(n => ({
              imageAlt: n.topic || 'noticia',
              imageSrc: this.url_1 + "get-image/" + n.image,   // Asegúrate de que este sea el nombre correcto en tu modelo News
              link: n.link
            }));
            console.log(this.images, 'prueba')
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }

    getBuzon(id: any){
      this._buzonService.getBuzon(id).subscribe(
        response => {
          this.newBuzon = response.newBuzon;
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
  
      this.newBuzon.name = formValues.name;
      this.newBuzon.mail = formValues.mail;
      this.newBuzon.fone = formValues.fone;
      this.newBuzon.mensaje = formValues.mensaje;
  
      const today = new Date();
      // Restar un día
      today.setDate(today.getDate());
  
      // Formatear como 'yyyy-mm-dd'
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
      const dd = String(today.getDate()).padStart(2, '0');
  
      this.newBuzon.fecha_mensaje = `${yyyy}-${mm}-${dd}`;
  
      this._buzonService.saveBuzon(this.newBuzon).subscribe(
        response => {
          if (response.newBuzon) {
            this.save_buzon = response.newBuzon;
            this.status = 'success';
            this.form.reset();
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.error(error);
          this.status = 'failed';
        }
      );
    }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;

    if (
      this.panelAbierto &&
      this.panelRef &&
      !this.panelRef.nativeElement.contains(clickedElement) &&
      !clickedElement.classList.contains('pestana-toggle')
    ) {
      this.panelAbierto = false;
      console.log('Panel cerrado por clic fuera');
    }
  }


  @HostListener('window:resize', [])
  onResize() {
    this.checkTamanioPantalla();
  }

  checkTamanioPantalla() {
    this.esMovil = window.innerWidth <= 780;
  }
}

