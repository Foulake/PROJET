import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TokenStorageService } from "./token-storage.service";





const TOKEN_HEADER_KEY ='Authorization'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    static accessToken ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyLHlheWEwOTQ3QGdtYWlsLmNvbSIsInJvbGVzIjoiW1JPTEVfQURNSU5dIiwiaXNzIjoiY29kZSBTZW1hZiIsImlhdCI6MTY3MjA1NTc3NiwiZXhwIjoxNjcyMDU3MjE2fQ.8gwzwSbmbp1eOeNoUbEVJtYEZZY-iC-hhIJYcNnCPoKFb2yu0tniUbtb0clo0mn7h2LRs8KAfK-rqg9x-HrC8A";
    
    constructor(private token:TokenStorageService){}

    intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
        //let authReq=req;
        //const token =this.token.getToken();
       // if(token!= null){
           // authReq =req.clone({headers:req.headers.set(TOKEN_HEADER_KEY,'Bearer' +token)});
       // }
    //   const token =TokenStorageService.getItem('token');
      // request =request.clone({headers:request.headers.set('Authorization','bearer' +token)});
      const req = request.clone({
        setHeaders:{
            Authorization:`Bearer ${AuthInterceptor.accessToken}`
        }
      });
        return next.handle(req);

        
    }
}
export const HttpInterceptorProviders =[
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}

]