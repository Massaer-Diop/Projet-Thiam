import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDiourbelComponent } from './result-diourbel.component';

describe('ResultDiourbelComponent', () => {
  let component: ResultDiourbelComponent;
  let fixture: ComponentFixture<ResultDiourbelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultDiourbelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDiourbelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
