import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';

@Component({
  selector: 'app-categorie-fournisseur-list',
  templateUrl: './categorie-fournisseur-list.component.html',
  styleUrls: ['./categorie-fournisseur-list.component.scss']
})
export class CategorieFournisseurListComponent {
  errorMessage!: string;
  categorieFournisseurs?: CategorieFournisseur[];
  currentCategorieFournisseur: CategorieFournisseur = {};
  currentIndex = -1;
    description = '';
  closeResult!:string;
  message = '';

  
  form: any = {
  
    description:''

    
  };
  isSuccessful = false;
  isSignUpFailed = false;

   @Input() currentCategorieFournisseurs: CategorieFournisseur = {
  
    description:''

   };

  constructor( private httpClient: HttpClient,
    private categorieFournisseurService: CategorieFournisseurService, private route: Router) { }

  ngOnInit(): void {
    this.message= '';
     this.getAllCategorieFournisseurs();
  }

  
onSubmit(): void {
   
   this.categorieFournisseurService.create(this.form).subscribe({
     next: data => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
     },
     error: err => {
       this.errorMessage = err.error.message;
       console.log(this.errorMessage);
       this.isSignUpFailed = true;
     }
   });
 }

  getAllCategorieFournisseurs(){
    this.categorieFournisseurService.getAllCategorieFournisseur()
      .subscribe({
      next: (data) =>{
        this.categorieFournisseurs = data;
        console.log('Data', data);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  refreshList(): void {
    this.getAllCategorieFournisseurs();
    this.currentCategorieFournisseur = {}
    this.currentIndex = 1;
  }

  setActivetedCategorieFournisseur(categorieFournisseur: CategorieFournisseur, index: number){
    this.currentCategorieFournisseur= categorieFournisseur;
    this.currentIndex = -1;
  }

  removeAllCategorieFournisseur(): void {
    this.categorieFournisseurService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: err => {
        this.errorMessage= err.error.message;
      }
    });
  }

  removeSelected(): void {
    this.categorieFournisseurService.delete(this.currentCategorieFournisseur.id)
    .subscribe({
      next: (res) =>{
        console.log(res);
        res.message ? res.message : 'Cet CategorieFournisseur supprimer avec succès !';
        //this.router.navigate()
        this.refreshList();
      },
      error: err => {
        this.message = this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        
      }
    })
  }
  updateCatfour(id:number){
    this.route.navigate(['addcategorieFournisseur', id]);

  }
  deleteCatfour(id:number){
    this.categorieFournisseurService.delete(id).subscribe(data=>{
      console.log(data);
     this.getAllCategorieFournisseurs();


  })
}

  searchCategorieFournisseur(): void {
    this.currentCategorieFournisseur = {};
    this.currentIndex = -1;

    this.categorieFournisseurService.findCategorieFournisseur(this.currentCategorieFournisseur)
    .subscribe({
      next: (data) =>{
        this.categorieFournisseurs = data;
        console.log(data);
        
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(err);
        
      }
    })
  }
}



