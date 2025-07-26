import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosEmprendedoresComponent } from './servicios-emprendedores.component';

describe('ServiciosEmprendedoresComponent', () => {
  let component: ServiciosEmprendedoresComponent;
  let fixture: ComponentFixture<ServiciosEmprendedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosEmprendedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosEmprendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
