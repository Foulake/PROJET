import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl="https://localhost:8181/auth/login"

  constructor(private http: HttpClient, private router:Router) { }
  tokensresp:any;
  private _updatemenu =new Subject<void>();
  get updatemenu(){
    return this._updatemenu;

  }
  Proceddlogin(usercred:any){
    return this.http.post(this.apiUrl + 'authenticate ',usercred);
  }
  GenerateRefreshToken(): any{
    let input ={
      "jwtToken":this.GenerateRefreshToken(),
      "refreshToken":this.GenerateRefreshToken()

    }
    return this.http.post(this.apiUrl +'refresh',input);
  }
}
