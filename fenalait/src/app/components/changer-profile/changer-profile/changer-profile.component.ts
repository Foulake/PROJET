import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/token-storage.service';

@Component({
  selector: 'app-changer-profile',
  templateUrl: './changer-profile.component.html',
  styleUrls: ['./changer-profile.component.scss']
})
export class ChangerProfileComponent implements OnInit {

  currentUser: any;
  constructor(private stokage: TokenStorageService,
    private route: Router) { }

  ngOnInit(): void {
    this.currentUser = this.stokage.getUser();
  }

  

}
