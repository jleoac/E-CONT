import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosMipymesComponent } from './servicios-mipymes.component';

describe('ServiciosMipymesComponent', () => {
  let component: ServiciosMipymesComponent;
  let fixture: ComponentFixture<ServiciosMipymesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosMipymesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosMipymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
