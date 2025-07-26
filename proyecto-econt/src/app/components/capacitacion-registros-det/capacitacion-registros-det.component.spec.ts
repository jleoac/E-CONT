import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionRegistrosDetComponent } from './capacitacion-registros-det.component';

describe('CapacitacionRegistrosDetComponent', () => {
  let component: CapacitacionRegistrosDetComponent;
  let fixture: ComponentFixture<CapacitacionRegistrosDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionRegistrosDetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitacionRegistrosDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
