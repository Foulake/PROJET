import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit{

  form: any = {
    nom: '',
      prenom: '',
      tel: '',
      dateFour:'',
      categoryFourId:'',
      categoryFourNom:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
categorieFournisseurs: any[]=[];
  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
    ,private route:ActivatedRoute
   , private router: Router){}
    
   ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
        if(id){
          this.fournisseurService.get(id).subscribe({
            next: fournisseur => {
              this.form = fournisseur;
            }
          })
        }
  }

  onSubmit(): void {
    this.fournisseurService.create(this.form).subscribe({
      next: (data: any) => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.router.navigate(['/fournisseur']);
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
  
