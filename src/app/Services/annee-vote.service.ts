import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnneeVoteService {

  private apiURL = "http://localhost:8000/api/annee_vote/";
  constructor() { }
}
