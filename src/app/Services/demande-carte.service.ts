import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListeDemande } from '../Models/liste-demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeCarteService {

  private apiURL = "http://localhost:8000/api/demande/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListeDemande[]> {
    return this.httpClient.get<ListeDemande[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(candidat: any): Observable<ListeDemande> {
    return this.httpClient.post<ListeDemande>(this.apiURL, JSON.stringify(candidat), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByID(id: number): Observable<ListeDemande> {
    return this.httpClient.get<ListeDemande>(this.apiURL + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, person: any): Observable<ListeDemande> {
    return this.httpClient.put<ListeDemande>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<ListeDemande>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchCNI(id: number) {
    return this.httpClient.get<ListeDemande>(this.apiURL + "searchByCNI/" + id)
      .pipe(
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
