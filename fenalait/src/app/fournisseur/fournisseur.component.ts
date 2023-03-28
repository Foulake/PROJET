import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
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
  public pageTitle!: string;
  categorieFournisseur:CategorieFournisseur={};
listCategorieFournisseur!: CategorieFournisseur[];
  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
    ,private route:ActivatedRoute
   , private router: Router,){}
    
   ngOnInit(): void {
    this.categorieFournisseurService.getAll()
    .subscribe({
      next: (res: any) => {
        this.listCategorieFournisseur = res.content;
        console.log('res ', this.listCategorieFournisseur);
        
      }
    });

    const id = this.route.snapshot.params['id'];
     console.log('id ', id);
     
        if(id){
          this.fournisseurService.get(id).subscribe({
            next: data => {
              this.form = data;
              console.log('test ', this.form);
             
              this.categorieFournisseur = this.form.categoryFourNom ? this.form.categoryFourNom: {};
            
              
            }
          });
        } }
  
  onSubmit(): void {
    this.form.categoryFourNom=this.categorieFournisseur;
    this.fournisseurService.create(this.form).subscribe({
      next: data => {
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
  
