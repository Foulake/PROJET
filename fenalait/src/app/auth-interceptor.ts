import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TokenStorageService } from "./token-storage.service";





const TOKEN_HEADER_KEY ='Authorization'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token:TokenStorageService){}

    intercept(req: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
        let authReq=req;
        const token =this.token.getToken();
        if(token!= null){
            authReq =req.clone({headers:req.headers.set(TOKEN_HEADER_KEY,'Bearer' +token)});
        }
        return next.handle(authReq);

        
    }
}
export const HttpInterceptorProviders =
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}

 