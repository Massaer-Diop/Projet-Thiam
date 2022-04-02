import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElecteurComponent } from './list-electeur.component';

describe('ListElecteurComponent', () => {
  let component: ListElecteurComponent;
  let fixture: ComponentFixture<ListElecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListElecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListElecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
