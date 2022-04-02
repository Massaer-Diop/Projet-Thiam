import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListeCandidat } from '../Models/liste-candidat';


@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiURL = "http://localhost:8000/api/candidat/";
  private apiCandidats = "http://localhost:8000/api/findAllCandidatByCommune/";
  private api = "http://127.0.0.1:8000/api/findAllCandidat/";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListeCandidat[]> {
    return this.httpClient.get<ListeCandidat[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(candidat: any): Observable<ListeCandidat> {
    return this.httpClient.post<ListeCandidat>(this.apiURL, JSON.stringify(candidat), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByID(id: number): Observable<ListeCandidat> {
    return this.httpClient.get<ListeCandidat>(this.apiURL + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, person: any): Observable<ListeCandidat> {
    return this.httpClient.put<ListeCandidat>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<ListeCandidat>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  search(id: number) {
    return this.httpClient.get<ListeCandidat>(this.apiURL+"search/"+ id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchCNI(id: number) {
    return this.httpClient.get<ListeCandidat>(this.apiURL+"searchByCNI/"+ id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  FindAllCandidatCommune(id: string){
    return this.httpClient.get<ListeCandidat>(this.apiCandidats + id).pipe(
      catchError(this.errorHandler)
    )
  }

  findAllCandidat(){
    return this.httpClient.get<ListeCandidat>(this.api).pipe(
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
