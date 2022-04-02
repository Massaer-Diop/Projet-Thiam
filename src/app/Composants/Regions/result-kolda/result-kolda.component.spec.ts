import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultKoldaComponent } from './result-kolda.component';

describe('ResultKoldaComponent', () => {
  let component: ResultKoldaComponent;
  let fixture: ComponentFixture<ResultKoldaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultKoldaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultKoldaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
