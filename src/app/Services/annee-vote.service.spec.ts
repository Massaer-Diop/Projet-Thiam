import { TestBed } from '@angular/core/testing';

import { AnneeVoteService } from './annee-vote.service';

describe('AnneeVoteService', () => {
  let service: AnneeVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
