import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MagasinService } from '../services/magasin.service';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.scss']
})
export class UpdateMagasinComponent implements OnInit {


  form: any = {
    nomMagasin: ''
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
    this.magasinService.update(this.form.id , this.form).subscribe({
      next: data => {
        console.log(data);
        this.toast.showSuccess("magasin modifierr avec succès !!", "Ajouter");
        this.isSuccessful = true;
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.router.navigate(['/magasin']);
        this.successMessage = "magasin enrégistre avec succès !";
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
  
  
  
  
