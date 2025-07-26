import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasLecturaComponent } from './noticias-lectura.component';

describe('NoticiasLecturaComponent', () => {
  let component: NoticiasLecturaComponent;
  let fixture: ComponentFixture<NoticiasLecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasLecturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
