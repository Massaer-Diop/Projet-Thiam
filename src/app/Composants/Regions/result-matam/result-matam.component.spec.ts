import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMatamComponent } from './result-matam.component';

describe('ResultMatamComponent', () => {
  let component: ResultMatamComponent;
  let fixture: ComponentFixture<ResultMatamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultMatamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMatamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
