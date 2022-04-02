import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDakarComponent } from './result-dakar.component';

describe('ResultDakarComponent', () => {
  let component: ResultDakarComponent;
  let fixture: ComponentFixture<ResultDakarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDakarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDakarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
