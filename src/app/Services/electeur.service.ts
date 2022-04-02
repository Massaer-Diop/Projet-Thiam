import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Electeur } from '../Models/electeur';
@Injectable({
  providedIn: 'root'
})
export class ElecteurService {
  private apiURL = "http://localhost:8000/api/electeur/";
  private apiElecteurs = "http://localhost:8000/api/joinCommuneRegionElecteur/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

   isConnect: any;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Electeur[]> {
    return this.httpClient.get<Electeur[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(candidat: any): Observable<Electeur> {
    return this.httpClient.post<Electeur>(this.apiURL, JSON.stringify(candidat), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByID(id: number): Observable<Electeur> {
    return this.httpClient.get<Electeur>(this.apiURL + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, electeur: any): Observable<Electeur> {
    return this.httpClient.put<Electeur>(this.apiURL + id, JSON.stringify(electeur), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Electeur>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  search(id: number) {
    return this.httpClient.get<Electeur>(this.apiURL + "search/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchCNI(id: number) {
    return this.httpClient.get<Electeur>(this.apiURL + "searchByCNI/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchByNumElecteur(id: number) {
    return this.httpClient.get<Electeur>(this.apiURL + "searchByNumElecteur/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  FindCommuneRegion(id: number){
    this.isConnect = id
    return this.httpClient.get<Electeur>(this.apiElecteurs + id).pipe(
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
