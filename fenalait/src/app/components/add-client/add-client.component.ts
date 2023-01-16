import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit{

form: any = {
  nomClient: '',
  prenomClient:'',
  telClient:''
};
isSuccessful = false;
isSignUpFailed = false;
errorMessage = '';
successMessage = '';

constructor(private clientService: ClientService,
  private route: Router,
  private activetedRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    const id = this.activetedRoute.snapshot.params['id'];
        if(id){
          this.clientService.get(id).subscribe({
            next: client => {
              this.form = client;
            }
          })
        }
  }

onSubmit(): void {
 // const { prenomClient, nomClient, telClient } = this.form;
if(!this.form.id){
  this.clientService.create(this.form).subscribe({
    next: data => {
      console.log(data);
      //this.isSuccessful = true;
      //this.isSignUpFailed = false;
      if(this.isSuccessful=true){
      this.route.navigate(['/client']);
      this.successMessage = "Client enrégistre avec succès !";
      }
    },
    error: err => {
      this.errorMessage = err.error.message;
      console.log(this.errorMessage);
      this.isSignUpFailed = true;
    }
  });
}else{
  this.clientService.update(this.form.id, this.form).subscribe({
    next: data => {
      console.log(data);
      //this.isSuccessful = true;
      //this.isSignUpFailed = false;
      if(this.isSuccessful=true){
      this.route.navigate(['/client']);
      this.successMessage = "Client enrégistre avec succès !";
      }
    },
    error: err => {
      this.errorMessage = err.error.message;
      console.log(this.errorMessage);
      this.isSignUpFailed = true;
    }
  });
}

}


newclient(): void {
  this.isSuccessful = false;
  this.form = {
    nomClientClient: '',
    prenomClientClient: '',
    telClient: '',
  };
}

}
