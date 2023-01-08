import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtResponse } from './jwt-response';
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
  }

  public getTokenAccess(): any {
    return window.sessionStorage.getItem(USER_KEY);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isConnected(jwt: JwtResponse): void {
    sessionStorage.setItem('connectedUser', JSON.stringify(jwt));
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