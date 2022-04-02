import { TestBed } from '@angular/core/testing';

import { DemandeCarteService } from './demande-carte.service';

describe('DemandeCarteService', () => {
  let service: DemandeCarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeCarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
