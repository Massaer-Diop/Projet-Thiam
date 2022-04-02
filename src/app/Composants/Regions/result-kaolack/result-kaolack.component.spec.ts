import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultKaolackComponent } from './result-kaolack.component';

describe('ResultKaolackComponent', () => {
  let component: ResultKaolackComponent;
  let fixture: ComponentFixture<ResultKaolackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultKaolackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultKaolackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
