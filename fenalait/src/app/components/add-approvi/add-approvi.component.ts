import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Approvi } from 'src/app/models/approvi';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Produit } from 'src/app/models/produit';
import { ApproviService } from 'src/app/services/approvi.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { NotificationServiceService } from 'src/app/services/notification.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-add-approvi',
  templateUrl: './add-approvi.component.html',
  styleUrls: ['./add-approvi.component.scss']
})
  export class AddApproviComponent implements OnInit {
  approvi: Approvi = {};
  produit: Produit = {};
  fournisseur: Fournisseur = {};
  listFournisseur: Array<Fournisseur> = [];
 
  listProduit: Array<Produit> = [];
  public pageTitle!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';

constructor( private approviService: ApproviService,
  private route: Router,
  private fournisseurService: FournisseurService,
  private produitService: ProduitService,
  private notifyService: NotificationServiceService,
  private activetedRoute: ActivatedRoute){}  
  
  
  ngOnInit(): void {
    this.approvi.fournisseurId = 0;
    this.approvi.produitId = 0;
    this.fournisseurService.getAllSmall()
    .subscribe({
      next: (res: any) => {
        this.listFournisseur = res.content;
        console.log('res ', this.listFournisseur);
        
      }
    });

    this.produitService.getAllSmal()
      .subscribe({
        next: (res: any) =>{
          this.listProduit = res.content;
          console.log(this.listProduit);
        }
      });

    const id = this.activetedRoute.snapshot.params['id'];
     console.log('id =', id);
     
        if(!id){
          this.pageTitle= 'Ajouter un approvi';
        }else{
         
          this.approviService.get(id).subscribe({
            next: (data: any) => {
              this.approvi = data;
              this.pageTitle= `Modifier le approvi ${this.approvi.qteAppro}`;
              console.log('test ', data);
             
              //this.magasin.id = this.produit.magasinNom ? this.produit.magasinNom : {};
              //this.category.id = this.produit.categoryNom ? this.produit.categoryNom : {};             
            }
          }); 
        }
  }


  
onSubmit(): void {
  // this.produit.magsinId = this.magasin.id;
  // this.produit.categoryId = this.category.id;
  console.log("approvi contenu",this.approvi);
  if(!this.approvi.id){
    //var body = JSON.parse(body)
   this.approviService.addApprovi(this.approvi).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Approvi ajouté avec succès!", "Ajout");
        if(this.isSuccessful=true){
        this.route.navigate(['/appro']);
        this.successMessage = "Approvi enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }else{
     this.approviService.update(this.approvi.id, this.approvi).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("approvi modifié avec succès!", "Edit");
        
        if(this.isSuccessful=true){
        this.route.navigate(['/approvi']);
        this.successMessage = "approvi enrégistre avec succès !";
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
