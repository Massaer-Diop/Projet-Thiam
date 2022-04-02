import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Users } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiURLCandidat = "http://localhost:8000/api/candidat/";
  private apiURLElecteur = "http://localhost:8000/api/electeur/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  isAuth = false;
  private isLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private httpClient: HttpClient) { }

  toggleLogin(state: boolean):void
  {
    this.isLoggedIn.next(state)
  }

  status()
  {
    const localData: any = localStorage.getItem('user');
    if(!localData)
    {
      this.isLoggedIn.next(false);
      console.log('User non connected');
    }
    return this.isLoggedIn.asObservable(); 
  }
  
  loginAdmin(email: string, password: string){
   return this.httpClient.post("http://localhost:8000/api/login/", {
      email: email,
      password: password
   })
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
