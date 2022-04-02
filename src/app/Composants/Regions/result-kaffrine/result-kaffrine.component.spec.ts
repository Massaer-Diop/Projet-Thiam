import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultKaffrineComponent } from './result-kaffrine.component';

describe('ResultKaffrineComponent', () => {
  let component: ResultKaffrineComponent;
  let fixture: ComponentFixture<ResultKaffrineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultKaffrineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultKaffrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
