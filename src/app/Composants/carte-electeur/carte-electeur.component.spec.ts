import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteElecteurComponent } from './carte-electeur.component';

describe('CarteElecteurComponent', () => {
  let component: CarteElecteurComponent;
  let fixture: ComponentFixture<CarteElecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteElecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteElecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
