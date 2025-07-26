import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { Nl2brPipe } from 'src/app/pipes/nl2br.pipe';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [RegisterService, UploadService, Nl2brPipe]
})
export class SubscriptionComponent implements OnInit{

  form!: FormGroup;

  public title: string;
  public newRegister: Register;
  public save_project: any;
  public status: string | undefined;
  public url: string;

  constructor(
    private _registerService: RegisterService,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.title = "Ingresar Datos Informativos";
    const fecha: Date = new Date("01/01/2023")  
        const dia: number = fecha.getDate();
        const mes: number = fecha.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son 0-indexados!
        const anio: number = fecha.getFullYear();
        const fechaFormateada: string = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
        this.newRegister = new Register('','', fechaFormateada, fechaFormateada,'', '', '', fechaFormateada, fechaFormateada, '', '','','');
        this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getRegister(id);
    });
        
    this._route.params.subscribe(params => {
      const topic = params['topic'];
      const start_date = params['start_date'];
      const end_date = params['end_date'];
      const description = params['description'];
      const coach = params['coach'];
      const image = params['image'];
      
      this.newRegister.topic = topic;
      this.newRegister.start_date = start_date;
      this.newRegister.end_date = end_date;
      this.newRegister.description = description;
      this.newRegister.coach = coach;
      this.newRegister.image = image;
      this.title = `Capacitación: ${topic}, del `;
    });
    
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,}$/)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
      birthdate: ['', [Validators.required, this.minimumAgeValidator(15)]],
      mail: ['', [Validators.required, Validators.email]],
      fone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,}$/)]],
    });
  }

  getRegister(id: any){
    this._registerService.getRegister(id).subscribe(
      response => {
        this.newRegister = response.newRegister;
      },
      error => {
        console.log(<any>error);
      }
      
    )
  }

  getProject(id: any){
    this._registerService.getProject(id).subscribe(
      response => {
        this.newRegister = response.newProject;
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

    this.newRegister.name = formValues.name;
    this.newRegister.cedula = formValues.cedula;
    this.newRegister.birthdate = formValues.birthdate;
    this.newRegister.mail = formValues.mail;
    this.newRegister.fone = formValues.fone;

    const today = new Date();
    // Restar un día
    today.setDate(today.getDate());

    // Formatear como 'yyyy-mm-dd'
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
    const dd = String(today.getDate()).padStart(2, '0');

    this.newRegister.fecha_inscripcion = `${yyyy}-${mm}-${dd}`;

    this._registerService.saveRegister(this.newRegister).subscribe(
      response => {
        if (response.newRegister) {
          this.save_project = response.newRegister;
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

  
  private minimumAgeValidator(minAge: number) {
    return (control: any) => {
      const birthdate = new Date(control.value);
      const today = new Date();

      const age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      const d = today.getDate() - birthdate.getDate();

      const isOldEnough =
        age > minAge || (age === minAge && (m > 0 || (m === 0 && d >= 0)));

      return isOldEnough ? null : { tooYoung: true };
    };
  }

  goBack() {
    window.history.back(); // Esto regresa a la página anterior
  }
  
  //Para subir al inicio de la página
  scrollToTop(): void {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50); // pequeño retraso para que Angular cargue antes de hacer scroll
  }

}
