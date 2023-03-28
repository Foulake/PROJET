import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Magasin } from 'src/app/models/magasin';
import { Produit } from 'src/app/models/produit';
import { CategoryProduitService } from 'src/app/services/category-produit.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { NotificationServiceService } from 'src/app/services/notification.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit{

  
  produit: Produit = {};
  magasin: Magasin = {};
  listMagasin: Array<Magasin> = [];
  category: Category = {};
  listCategories: Array<Category> = [];
  public pageTitle!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';

constructor( private produitService: ProduitService,
  private route: Router,
  private magasinService: MagasinService,
  private catProdservice: CategoryProduitService,
  private notifyService: NotificationServiceService,
  private activetedRoute: ActivatedRoute){}  
  
  
  ngOnInit(): void {
    this.produit.magasinId = 0;
    this.produit.categoryId = 0;
    this.magasinService.getAll()
    .subscribe({
      next: (res: any) => {
        this.listMagasin = res.content;
        console.log('res ', this.listMagasin);
        
      }
    });

    this.catProdservice.getAllSmall()
      .subscribe({
        next: (res: any) =>{
          this.listCategories = res.content;
          console.log(this.listCategories);
        }
      });

    const productId = this.activetedRoute.snapshot.params['productId'];
     console.log('id =', productId);
     
        if(!productId){
          this.pageTitle= 'Ajouter un produit';
        }else{
         
          this.produitService.get(productId).subscribe({
            next: (data: any) => {
              this.produit = data;
              this.pageTitle= `Modifier le produit ${this.produit.nomPrdt}`;
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
  console.log("produit contenu",this.produit);
  if(!this.produit.id){
    //var body = JSON.parse(body)
   this.produitService.addProduit(this.produit).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Produit ajouté avec succès!", "Ajout");
        if(this.isSuccessful=true){
        this.route.navigate(['/produit']);
        this.successMessage = "Produit enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }else{
     this.produitService.update(this.produit.id, this.produit).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Produit modifié avec succès!", "Edit");
        
        if(this.isSuccessful=true){
        this.route.navigate(['/produit']);
        this.successMessage = "Produit enrégistre avec succès !";
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
