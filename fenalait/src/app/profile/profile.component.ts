import { Component } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
