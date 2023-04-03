import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
import { Fournisseur } from '../models/fournisseur';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { FournisseurService } from '../services/fournisseur.service';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit{

   fournisseur: Fournisseur = {};
  categorieFournisseur:CategorieFournisseur={}
    listCategorieFournisseur: Array<CategorieFournisseur> = [];
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  public pageTitle!: string;

  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
    ,private route:ActivatedRoute
   , private router: Router,
   private notifyService: NotificationServiceService
   ){}
    
   ngOnInit(): void {
    this.fournisseur.categoryFourId = 0;
    
    this.categorieFournisseurService.getAll()
    .subscribe({
      next: (res: any) => {
        this.listCategorieFournisseur = res.content;
        console.log('res ', this.listCategorieFournisseur);
        
      }
    });

    
    const id = this.route.snapshot.params['id'];
     console.log('id =', id);
     
        if(!id){
          this.pageTitle= 'Ajout un fournisseur';
        }
  }


  
onSubmit(): void {
  // this.produit.magsinId = this.magasin.id;
  // this.produit.categoryId = this.category.id;
  console.log("fournisseur contenu",this.fournisseur);
  if(!this.fournisseur.id){
    //var body = JSON.parse(body)
   this.fournisseurService.addFournisseur(this.fournisseur).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Fournisseur ajouté avec succès!", "Ajout");
        if(this.isSuccessful=true){
        this.router.navigate(['/fournisseur']);
        this.successMessage = "Fournisseur enrégistre avec succès !";
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

}
