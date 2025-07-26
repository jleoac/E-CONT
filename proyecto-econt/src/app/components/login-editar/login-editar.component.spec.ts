import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEditarComponent } from './login-editar.component';

describe('LoginEditarComponent', () => {
  let component: LoginEditarComponent;
  let fixture: ComponentFixture<LoginEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
