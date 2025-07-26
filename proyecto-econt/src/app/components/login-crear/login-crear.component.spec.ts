import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCrearComponent } from './login-crear.component';

describe('LoginCrearComponent', () => {
  let component: LoginCrearComponent;
  let fixture: ComponentFixture<LoginCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
