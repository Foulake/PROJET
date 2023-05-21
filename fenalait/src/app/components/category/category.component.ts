import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryProduitService } from 'src/app/services/category-produit.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  form: any = {
    nom:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor( private categoryProduitService: CategoryProduitService ,
    private route: Router, private activetedRoute: ActivatedRoute,
    private toast: NotificationServiceService,){}

  
      ngOnInit(): void {
        const id = this.activetedRoute.snapshot.params['id'];
            if(id){
              this.categoryProduitService.get(id).subscribe({
                next: category => {
                  this.form = category;
                  //this.pageTitle= `Modifier le categorie ${this.form.nom}`;
                }
              })
            }else{
             // this.pageTitle= 'Ajouter un categorie';
            }
      }
    
    onSubmit(): void {
    
    if(!this.form.id){
      this.categoryProduitService.create(this.form).subscribe({
        next: data => {
          console.log(data);
          this.toast.showSuccess("Categorie ajouté avec succès!", "Ajout");
          //this.isSuccessful = true;
          //this.isSignUpFailed = false;
          if(this.isSuccessful=true){
          this.route.navigate(['/catProdListe']);
          this.successMessage = "Categorie enrégistre avec succès !";
          }
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          this.isSignUpFailed = true;
        }
      });
    }else{
      this.categoryProduitService.update(this.form.id, this.form).subscribe({
        next: data => {
          console.log(data);
          this.toast.showSuccess("Categorie modifié avec succès!", "Edit");
          //this.isSuccessful = true;
          //this.isSignUpFailed = false;
          if(this.isSuccessful=true){
          this.route.navigate(['/catProdListe']);
          this.successMessage = "Categorie enrégistre avec succès !";
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
    
    
    newclient(): void {
      this.isSuccessful = false;
      this.form = {
        nom: '',
        
      };
    }
    
    }
    