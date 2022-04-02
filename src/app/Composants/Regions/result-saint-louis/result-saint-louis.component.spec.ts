import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSaintLouisComponent } from './result-saint-louis.component';

describe('ResultSaintLouisComponent', () => {
  let component: ResultSaintLouisComponent;
  let fixture: ComponentFixture<ResultSaintLouisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSaintLouisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSaintLouisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
