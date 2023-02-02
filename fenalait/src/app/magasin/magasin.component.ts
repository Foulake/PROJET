import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MagasinService } from '../services/magasin.service';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss']
})
export class MagasinComponent implements OnInit {

 
  form: any = {
    nomMagasin: '',
    localiteNom:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private magasinService: MagasinService,
    private router: Router, private activetedRoute:ActivatedRoute ,
    private toast: NotificationServiceService,){}

    ngOnInit(): void {
      const id = this.activetedRoute.snapshot.params['id'];
          if(id){
            this.magasinService.get(id).subscribe({
              next: magasin => {
                this.form = magasin;
              }
            })
          }
    }
  
  onSubmit(): void {
    this.magasinService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        this.toast.showSuccess("magasin ajouté avec succès !!", "Ajouter");
        this.isSuccessful = true;
        if(this.isSuccessful=true){
        this.router.navigate(['/magasin']);
        this.successMessage = "magasin enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.toast.showError("magsin n'a pas ajouté !", "Erreur");
        console.log(this.errorMessage);
      }
    });
  }
}