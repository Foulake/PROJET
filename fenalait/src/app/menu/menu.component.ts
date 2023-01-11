import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  currentUser: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private router: Router,
    private storageService: TokenStorageService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    
    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser();

      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;
    }
  }

  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['login']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  logouts(): void {
    if(!this.storageService.isLoggedIn){
      window.location.reload();
      this.router.navigate(['login']);
    }else{
      this.storageService.clean();
        window.location.reload();
        this.router.navigate(['login']);
    }
  }
}
