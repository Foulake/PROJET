import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: TokenStorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  goToMangerMotDePasse(){
    this.route.navigate(['/changerMoDePasse']);
  }
  goToChangerProfile(){
    this.route.navigate(['/changer-profile']);
  }
}
