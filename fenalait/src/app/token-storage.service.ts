import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { JwtResponse } from './jwt-response';
import { User } from './user';
=======
>>>>>>> 9c34b142727be041fa343cd49ff99b216246e418

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

  

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(user.nom));

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