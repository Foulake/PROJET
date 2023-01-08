import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private baseURL ='http://localhost:8181/auth/login'
  constructor(private httpClient: HttpClient) { }

  /** New codes 04/01/2023 */

  requestHeader = new HttpHeaders(
    { "No-Auth" : "True"}
  );

  public login(loginData: any){
    return this.httpClient.post(this.baseURL, loginData, { headers: this.requestHeader });
  }
}
