import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasEditarComponent } from './noticias-editar.component';

describe('NoticiasEditarComponent', () => {
  let component: NoticiasEditarComponent;
  let fixture: ComponentFixture<NoticiasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
