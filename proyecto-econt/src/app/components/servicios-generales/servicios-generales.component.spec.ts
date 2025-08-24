import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosGeneralesComponent } from './servicios-generales.component';

describe('ServiciosGeneralesComponent', () => {
  let component: ServiciosGeneralesComponent;
  let fixture: ComponentFixture<ServiciosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosGeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
