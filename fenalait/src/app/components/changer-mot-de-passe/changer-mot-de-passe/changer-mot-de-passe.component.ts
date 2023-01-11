import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/token-storage.service';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss']
})
export class ChangerMotDePasseComponent {

  constructor(private stokage: TokenStorageService){}

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.stokage.getUser();
  }
}
