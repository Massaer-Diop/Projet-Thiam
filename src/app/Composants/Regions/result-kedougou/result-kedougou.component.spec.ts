import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultKedougouComponent } from './result-kedougou.component';

describe('ResultKedougouComponent', () => {
  let component: ResultKedougouComponent;
  let fixture: ComponentFixture<ResultKedougouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultKedougouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultKedougouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
