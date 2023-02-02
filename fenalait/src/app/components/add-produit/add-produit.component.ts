import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Magasin } from 'src/app/models/magasin';
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

  form: any = {
    nomPrdt: '',
    qte: '',
    dateExp: '',
    code: '',
    price: '',
    categoryNom: '',
    magasinNom: ''
  };
  
  magasin: Magasin = {};
  listMagasin!: Magasin[];
  category: Category = {};
  listCategories!: Category[];
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

    const id = this.activetedRoute.snapshot.params['id'];
     console.log('id ', id);
     
        if(id){
          this.produitService.get(id).subscribe({
            next: data => {
              this.form = data;
              console.log('test ', this.form);
             
              this.magasin = this.form.magasinNom ? this.form.magasinNom: {};
              this.category = this.form.categoryNom ? this.form.categoryNom : {};
              this.pageTitle= `Modifier le produit ${this.form.nomPrdt}`;
            }
          });
        }else{
          this.pageTitle= 'Ajouter un produit';
        }
  }
  
onSubmit(): void {
  //this.form.categoryNom = this.category;
  if(!this.form.id){
    this.form.magasinNom = this.magasin;
    this.form.categoryNom = this.category;
    this.produitService.addProduit(this.form).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Produit ajouté avec succès!", "Ajout");
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/Produit']);
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
    this.produitService.update(this.form.id, this.form).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Produit modifié avec succès!", "Edit");
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
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
