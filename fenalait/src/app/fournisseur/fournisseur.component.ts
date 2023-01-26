import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent {

  form: any = {
    nom: '',
      prenom: '',
      tel: '',
      dateFour:'',
      categoryFourId:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
listCategorieFournisseur: any[]=[];
  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
   , private route: Router){}
  
  onSubmit(): void {
    this.fournisseurService.create(this.form).subscribe({
      next: (data: any) => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/fournisseur']);
        this.successMessage = "fournisseur enrégistre avec succès !";
        }
      },
      error: (err:any) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }
  
  
  newfournisseur(): void {
    this.isSuccessful = false;
    this.form = {
      nom: '',
      prenom: '',
      tel: '',
      dateFour:''
    };
  }
  
  }
  
