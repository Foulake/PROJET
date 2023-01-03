import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredential } from './interfaces/credentials';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignupInfo } from './signup-info';


const httpOptions={
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private loginUrl='http://localhost:8181/auth/login';
 private signupUrl='http://localhost:8181/auth/sign';  


  constructor(private http:HttpClient) { }
 login (credentials:ICredential):Observable<JwtResponse>
{
  return this.http.post<JwtResponse>(this.loginUrl, credentials,httpOptions);
}  
signUp(info:SignupInfo):Observable<string>{
  return this.http.post<string>(this.signupUrl,info,httpOptions);
} 
}
