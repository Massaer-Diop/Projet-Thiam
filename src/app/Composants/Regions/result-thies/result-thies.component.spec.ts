import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultThiesComponent } from './result-thies.component';

describe('ResultThiesComponent', () => {
  let component: ResultThiesComponent;
  let fixture: ComponentFixture<ResultThiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultThiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultThiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
