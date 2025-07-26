import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasListadoComponent } from './noticias-listado.component';

describe('NoticiasListadoComponent', () => {
  let component: NoticiasListadoComponent;
  let fixture: ComponentFixture<NoticiasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
