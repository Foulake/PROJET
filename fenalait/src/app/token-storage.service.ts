import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 const TOKEN_KEY ='authtoken';
 const USERNAME_KEY ='AuthUsername';
 const AUTHORITIES_KEY='AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles:Array<string> =[];


  constructor(private router:Router) { }
  signOut(){
    window.sessionStorage.clear();
  }
  public saveToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
    this.router.navigate(['/dasbord'])
 

  }
  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveEmail(email:string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,email);
    }
    public getEmail(){
      return sessionStorage.getItem(USERNAME_KEY);
    }
    public saveAuthorities(authorities:string){
      window.sessionStorage.removeItem(AUTHORITIES_KEY);
      window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
    }
    //public getAuthorities(): string[]{
     // this.roles =[];
     /// if(sessionStorage.getItem(TOKEN_KEY)){
       // JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach
        //(authority =>{
          //this.roles.push(authority.authority);
       // });

     // }
     // return this.roles;
    }

//}
