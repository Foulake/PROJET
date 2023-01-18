import { Component, Input, OnInit } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { HttpClient } from '@angular/common/http';
import { FournisseurService } from '../services/fournisseur.service';


@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  errorMessage!: string;
  fournisseurs?: Fournisseur[];
  currentFournisseur: Fournisseur = {};
  currentIndex = -1;
    nom = '';
  closeResult!:string;
  message = '';

  
  form: any = {
    nom: '',
    prenom:'',
    tel:'',
    dateFour:''


    
  };
  isSuccessful = false;
  isSignUpFailed = false;
  @Input() currentFournisseurs: Fournisseur = {
    nom: '',
    prenom:'',
    tel:'',
  
   };

  constructor( private httpClient: HttpClient,
    private fournisseurService: FournisseurService) { }

  ngOnInit(): void {
    this.message= '';
     this.getAllFournisseurs();
  }

  
onSubmit(): void {
 
   this.fournisseurService.create(this.form).subscribe({
     next: (data:any) => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
     },
     error: (err:any) => {
       this.errorMessage = err.error.message;
       console.log(this.errorMessage);
       this.isSignUpFailed = true;
     }
   });
 }

  getAllFournisseurs(){
    this.fournisseurService.getAllFournisseur()
      .subscribe({
      next: (data:any) =>{
        this.fournisseurs = data;
        console.log('Data', data);
      },
      error: (err:any) =>{
        console.log(err);
      }
    });
  }

  refreshList(): void {
    this.getAllFournisseurs();
    this.currentFournisseur = {}
    this.currentIndex = 1;
  }

  setActivetedFournisseur(fournisseur: Fournisseur, index: number){
    this.currentFournisseur= fournisseur;
    this.currentIndex = -1;
  }

  removeAllFournisseur(): void {
    this.fournisseurService.deleteAll()
    .subscribe({
      next: (res:any) => {
        console.log(res);
        this.refreshList();
      },
      error: (err:any) => {
        this.errorMessage= err.error.message;
      }
    });
  }

  removeSelected(): void {
    this.fournisseurService.delete(this.currentFournisseurs.id)
    .subscribe({
      next: (res:any) =>{
        console.log(res);
        res.message ? res.message : 'Cet fournisseur supprimer avec succès !';
        //this.router.navigate()
        this.refreshList();
      },
      error: (err:any) => {
        this.message = this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        
      }
    })
  }

  searchFournisseur(): void {
    this.currentFournisseur = {};
    this.currentIndex = -1;

    this.fournisseurService.findFournisseur(this.nom)
    .subscribe({
      next: (data:any) =>{
        this.fournisseurs = data;
        console.log(data);
        
      },
      error: (err:any) => {
        this.errorMessage = err.error.message;
        console.log(err);
        
      }
    })
  }
}
