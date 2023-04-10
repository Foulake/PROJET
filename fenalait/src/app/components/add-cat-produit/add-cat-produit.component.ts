import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduitService } from 'src/app/services/category-produit.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-cat-produit',
  templateUrl: './add-cat-produit.component.html',
  styleUrls: ['./add-cat-produit.component.scss']
})
export class AddCatProduitComponent implements OnInit{

  
  form: any = {
    nom: ''
  };

  pageTitle!: string;
  isSuccessful = false;
  errorMessage = '';
  successMessage = '';

  constructor(private catProdService: CategoryProduitService,
              private activedRoute: ActivatedRoute,
              private toast: NotificationServiceService,
              private router: Router){}

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if(id){
      this.catProdService.findById(id).subscribe({
        next: category => {
          this.form = category;
          this.pageTitle = `Modifier la catégorie ${this.form.nom}`
        }
      });
    }else{
      this.pageTitle= "Ajouter une catégorie"
    }
  }

  onSubmit(){
    if(!this.form.id){
      this.catProdService.addCategory(this.form).subscribe({
        next: data =>{
          console.log('categorie : ', data);
          this.toast.showSuccess("Employe ajouté avec succès !!", "Ajout");
          this.isSuccessful = true;
          if(this.isSuccessful=true){
          this.router.navigate(['/listCat']);
          this.successMessage = "Catégorie enrégistre avec succès !";
          
        }
          },
          error: err =>{
            this.errorMessage = err.error.message;
            this.toast.showError("Employe n'a pas ajouté !", "Erreur");
            console.log(this.errorMessage);
          }
            
        });
      }else{
        this.catProdService.update(this.form, this.form).subscribe({
          next: data =>{
            this.form = data;
            this.toast.showSuccess("Catégorie modifié avec succès !!", "Edit");
            this.isSuccessful = true;
            if(this.isSuccessful=true){
              this.router.navigate(['/catProd']);
            }
          },
          error: err =>{
            this.errorMessage = err.error.message;
            this.toast.showError("Catégorie n'a pas été modifiée !", "Erreur");
            console.log(this.errorMessage);
          }
        });
  
        
      } 
    }

}
