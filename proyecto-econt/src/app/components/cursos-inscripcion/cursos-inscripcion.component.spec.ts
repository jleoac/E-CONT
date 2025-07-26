import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosInscripcionComponent } from './cursos-inscripcion.component';

describe('CursosInscripcionComponent', () => {
  let component: CursosInscripcionComponent;
  let fixture: ComponentFixture<CursosInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
