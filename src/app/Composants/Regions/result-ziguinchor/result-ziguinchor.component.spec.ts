import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultZiguinchorComponent } from './result-ziguinchor.component';

describe('ResultZiguinchorComponent', () => {
  let component: ResultZiguinchorComponent;
  let fixture: ComponentFixture<ResultZiguinchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultZiguinchorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultZiguinchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
