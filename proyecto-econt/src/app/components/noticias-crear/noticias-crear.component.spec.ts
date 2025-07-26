import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasCrearComponent } from './noticias-crear.component';

describe('NoticiasCrearComponent', () => {
  let component: NoticiasCrearComponent;
  let fixture: ComponentFixture<NoticiasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
