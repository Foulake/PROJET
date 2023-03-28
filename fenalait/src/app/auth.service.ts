import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user';

const Url="http://localhost:8181/auth/";
const BaseUrl="http://localhost:8181/api/users/";
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

getAllUsers(params: any): Observable<User[]>{
  return this.http.get<User[]>(BaseUrl + 'getAllUsers', {params});
}

get(id: any): Observable<User> {
  return this.http.get<User>(`${BaseUrl + 'get'}/${id}`);
}

update(id: any, data : any): Observable<any>{
  return this.http.put(`${BaseUrl + 'edit'}/${id}`, data, httpOptions);
}

public delete(id: any): Observable<any>{
  return this.http.delete(`${BaseUrl + '/delete'}/${id}`, httpOptions);
}

signout(): void {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('tokenAccess');
  sessionStorage.removeItem('tokenRefresh');
}

logout(): Observable<any> {
  return this.http.post(Url + 'signout', { }, httpOptions);
}
/**
hasRole(): void {
  return this.login.role.includes(role);
} */
}
