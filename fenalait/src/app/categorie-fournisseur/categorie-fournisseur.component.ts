import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';

@Component({
  selector: 'app-categorie-fournisseur',
  templateUrl: './categorie-fournisseur.component.html',
  styleUrls: ['./categorie-fournisseur.component.scss']
})
export class CategorieFournisseurComponent {
  form: any = {
    description:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private categorieFournisseurService: CategorieFournisseurService,
    private route: Router){}

  onSubmit(): void {
     
    this.categorieFournisseurService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/categorieFournisseur']);
        this.successMessage = "CategorieFournisseur enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }
  
  
  newcategorieFournisseur(): void {
    this.isSuccessful = false;
    this.form = {
    
      description: ''
      
    };
  }
  
  }
  


