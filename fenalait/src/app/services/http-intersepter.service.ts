import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtResponse } from '../jwt-response';
import { Observable } from "rxjs";
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntersepterService {

  constructor(private tokenSessionStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let data: any = {}

    if (this.tokenSessionStorage.isLoggedIn()) {
      data = (this.tokenSessionStorage.getUser().tokenAccess) as string;
      console.log('tokenAccess :', data);
    }

    const authReq = req.clone({
      withCredentials: true,

      headers: new HttpHeaders({
        Authorization: 'Bearer ' + data
      })
    });

    return next.handle(authReq);
  }
}
