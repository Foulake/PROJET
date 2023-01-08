import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Url="http://localhost:8181/auth/";
 const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<any> {
  return this.http.post(
    Url + 'login',
    {
      email,
      password,
    },
    httpOptions
  );
}

register(prenom: string, nom: string, email: string, password: string): Observable<any> {
  return this.http.post(
    Url + 'sign',
    {
      prenom,
      nom,
      email,
      password,
    },
    httpOptions
  );
}

signout(): void {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('tokenAccess');
  sessionStorage.removeItem('tokenRefresh');
}

logout(): Observable<any> {
  return this.http.post(Url + 'signout', { }, httpOptions);
}
}
