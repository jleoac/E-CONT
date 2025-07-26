import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasPublicoComponent } from './noticias-publico.component';

describe('NoticiasPublicoComponent', () => {
  let component: NoticiasPublicoComponent;
  let fixture: ComponentFixture<NoticiasPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasPublicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
