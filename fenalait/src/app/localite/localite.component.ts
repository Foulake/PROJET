import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { LocaliteService } from '../services/localite.service';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.scss']
})
export class LocaliteComponent implements OnInit {

  form: any = {
    nom: '',
    description:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private localiteService: LocaliteService,
    private router: Router, private activetedRoute:ActivatedRoute ,
    private toast: NotificationServiceService,){}

    ngOnInit(): void {
      const id = this.activetedRoute.snapshot.params['id'];
          if(id){
            this.localiteService.get(id).subscribe({
              next: localite => {
                this.form = localite;
              }
            })
          }
    }
  
  onSubmit(): void {
    this.localiteService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        this.toast.showSuccess("Localite ajouté avec succès !!", "Ajouter");
        this.isSuccessful = true;
        if(this.isSuccessful=true){
        this.router.navigate(['/localite']);
        this.successMessage = "Localite enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.toast.showError("Localite n'a pas ajouté !", "Erreur");
        console.log(this.errorMessage);
      }
    });
  }
}