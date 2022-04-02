import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLougaComponent } from './result-louga.component';

describe('ResultLougaComponent', () => {
  let component: ResultLougaComponent;
  let fixture: ComponentFixture<ResultLougaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultLougaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultLougaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
