import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  employe: Employe ={}
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  public pageTitle!: string;


  constructor(private employeService:EmployeService,
    private router: Router,
    private notifyService: NotificationServiceService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
          if(id){
            this.employeService.get(id).subscribe({
              next: employe => {
              //  this.employe = employe;
              }
            })
          }
    }
  
  onSubmit(): void {
    this.employeService.addEmploye(this.employe).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Employe ajouté avec succès !!", "Ajouter");
        this.isSuccessful = true;
        if(this.isSuccessful=true){
        this.router.navigate(['/employe']);
        this.successMessage = "Employe enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.notifyService.showError("Employe n'a pas ajouté !", "Erreur");
        console.log(this.errorMessage);
      }
    });
  }
}