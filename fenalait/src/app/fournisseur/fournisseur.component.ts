import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent {

  form: any = {
    nomClient: '',
    prenomClient:'',
    telClient:'',
    password:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private clientService: ClientService,
    private route: Router){}
  
  onSubmit(): void {
   // const { prenomClient, nomClient, telClient } = this.form;
  
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
  
