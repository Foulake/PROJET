import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';

@Component({
  selector: 'app-update-catfour',
  templateUrl: './update-catfour.component.html',
  styleUrls: ['./update-catfour.component.scss']
})
export class UpdateCatfourComponent implements OnInit{
  form: any = {
    description:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private categorieFournisseurService: CategorieFournisseurService,
    private route: Router, private activetedRoute: ActivatedRoute){}

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

    this.categorieFournisseurService.update(this.form.id, this.form).subscribe({
      next: data => {
        console.log(data);
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
  
 

  


