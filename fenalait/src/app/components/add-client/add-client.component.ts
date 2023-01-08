import { Component } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {

  client: Client = {
    nomClient: '',
    prenomClient: '',
    telClient: '',
};
errorMessage!: string;
submeted = false;

constructor(private clientService: ClientService){}

saveclient(): void {
  const data = {
    nomClient: this.client.nomClient,
    prenomClient: this.client.prenomClient,
    telClient: this.client.telClient,
  };
  this.clientService.create(data)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.submeted = true;
      
    },
    error: (err) => {
      this.errorMessage= err.error.message;
      console.log(this.errorMessage);
    }
  });
}

newclient(): void {
  this.submeted = false;
  this.client = {
    nomClient: '',
    prenomClient: '',
    telClient: '',
  };
}

}
