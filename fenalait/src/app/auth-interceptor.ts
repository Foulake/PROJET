import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtResponse } from "./jwt-response";

//const TOKEN_HEADER_KEY ='Authorization'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
    
  constructor(){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let jwtResponse : JwtResponse = {} 
      if(sessionStorage.getItem('isConnected')){
        jwtResponse = JSON.parse(sessionStorage.getItem('isConnected') as string);
      }
      const authReq = req.clone({
          withCredentials: true,

          headers: new HttpHeaders({
            Authorizations: 'Bearer ' + jwtResponse.tokenAccess
          })
        });
    
        return next.handle(authReq);
      }
    }
    
    
