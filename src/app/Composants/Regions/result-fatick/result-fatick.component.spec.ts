import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFatickComponent } from './result-fatick.component';

describe('ResultFatickComponent', () => {
  let component: ResultFatickComponent;
  let fixture: ComponentFixture<ResultFatickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFatickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFatickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
