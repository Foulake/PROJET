import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaliteService } from '../services/localite.service';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.scss']
})
export class LocaliteComponent {

  form: any = {
    nom: '',
    description:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private localiteService: LocaliteService,
    private route: Router){}

  onSubmit(): void {
   // const { prenomClient, nomClient, telClient } = this.form;
  
    this.localiteService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/localite']);
        this.successMessage = "Localite enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }
  
  
  newlocalite(): void {
    this.isSuccessful = false;
    this.form = {
      nom: '',
      description: ''
      
    };
  }
  
  }
  