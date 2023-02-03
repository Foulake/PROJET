import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { NotificationServiceService } from '../services/notification.service';


@Component({
  selector: 'app-categorie-fournisseur',
  templateUrl: './categorie-fournisseur.component.html',
  styleUrls: ['./categorie-fournisseur.component.scss']
})
export class CategorieFournisseurComponent implements OnInit {
  form: any = {
    description:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private categorieFournisseurService: CategorieFournisseurService,
    private route: Router, private activetedRoute: ActivatedRoute,
    private toast: NotificationServiceService,){}

    ngOnInit(): void {
      const id = this.activetedRoute.snapshot.params['id'];
          if(id){
            this.categorieFournisseurService.get(id).subscribe({
              next: categorieFournisseur => {
                this.form = categorieFournisseur;
              }
            })
          }
    }
  
  onSubmit(): void {
    this.categorieFournisseurService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        this.toast.showSuccess("catefour ajouté avec succès !!", "Ajouter");
        this.isSuccessful = true;
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/categorieFournisseur']);
        this.successMessage = "categorieFournisseur enrégistre avec succès !";
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
  