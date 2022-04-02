import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Commune } from '../Models/commune';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
  
  private apiURL = "http://localhost:8000/api/commune/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8; application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Commune[]> {
    return this.httpClient.get<Commune[]>(this.apiURL)
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
