import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSedhiouComponent } from './result-sedhiou.component';

describe('ResultSedhiouComponent', () => {
  let component: ResultSedhiouComponent;
  let fixture: ComponentFixture<ResultSedhiouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSedhiouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSedhiouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
