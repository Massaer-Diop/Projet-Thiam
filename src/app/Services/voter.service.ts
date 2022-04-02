import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vote } from '../Models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  private apiURL = "http://localhost:8000/api/vote/";
  private apiurlAllCBC = "http://localhost:8000/api/allCandidatByCommune/";
  private apiurlAllCBR = "http://localhost:8000/api/allCandidatByRegion/";
  private apiurlCBC = "http://localhost:8000/api/candidatByCommune/";
  private apiurlCBR = "http://localhost:8000/api/candidatByRegion/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Vote[]> {
    return this.httpClient.get<Vote[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(vote: any): Observable<Vote> {
    return this.httpClient.post<Vote>(this.apiURL, JSON.stringify(vote), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllCountCandidatByRegion(){
    return this.httpClient.get<Vote>(this.apiurlAllCBR).pipe(
      catchError(this.errorHandler)
    )
  }

  getAllCountCandidatByCommune(){
    return this.httpClient.get<Vote>(this.apiurlAllCBC).pipe(
      catchError(this.errorHandler)
    )
  }

  getCandidatByCommune(nom: string) {
    return this.httpClient.get<Vote>(this.apiurlCBC + nom).pipe(
      catchError(this.errorHandler)
    )
  }

  getCandidatByRegion(nom: string) {
    return this.httpClient.get<Vote>(this.apiurlCBR + nom).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
