import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeCarteComponent } from './details-demande-carte.component';

describe('DetailsDemandeCarteComponent', () => {
  let component: DetailsDemandeCarteComponent;
  let fixture: ComponentFixture<DetailsDemandeCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDemandeCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandeCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
