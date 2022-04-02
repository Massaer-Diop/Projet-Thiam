import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTambaComponent } from './result-tamba.component';

describe('ResultTambaComponent', () => {
  let component: ResultTambaComponent;
  let fixture: ComponentFixture<ResultTambaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultTambaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTambaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
