import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 const TOKEN_KEY ='authtoken';
 const USERNAME_KEY ='AuthUsername';
 const AUTHORITIES_KEY='AuthAuthorities';

 const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private route: Router) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(user.roles[0].name!));

  }

  public getTokenAccess(): string {
    return window.sessionStorage.getItem('tokenAccess')!;
  }
  
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getUserRole(){
    let user = this.getUser();
    return user.roles[0].name;
  }

  isConnected(user: any): void {
    sessionStorage.setItem('connectedUser', JSON.stringify(user.tokenAccess));
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}