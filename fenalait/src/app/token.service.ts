import { Injectable } from '@angular/core';
import{Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private router: Router) { }
   
  saveToken(tokenAccess:string, tokenRefresh:string):void{
    localStorage.setItem('tokenAccess',tokenAccess)
    localStorage.setItem('tokenRefresh', tokenRefresh)
    this.router.navigate(['/dasbord'])
   }
public getRoles(): [] {
  return JSON.parse(localStorage.getItem('roles')!);
}

public setRoles( roles: []) {
  return localStorage.setItem('roles', JSON.stringify(roles));
}

public isLoggededIn(){
  return this.getRoles() && this.getTokenAccess() && this.getTokenRefresh();
}

islogged():boolean{
  const token =localStorage.getItem('tokenAccess')
  return !! token;
}
clearToken():void{
  localStorage.removeItem('tokenAccess');
}
getTokenAccess() :string {
  return localStorage.getItem('tokenAccess')!;
}

getTokenRefresh() : string{
  return localStorage.getItem('tokenRefresh')!;
}

setTokenAccess(token : string) {
  return localStorage.setItem('tokenAccess', token);
}

setTokenRefresh(token: string){
  return localStorage.setItem('tokenRefresh', token);
}

}