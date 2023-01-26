import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit{
 

  form: any = {
    firstName: '',
    lastName: '',
    titre:'',
    telEmploye:''
  };

  isSuccessful = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {

    const id = this.activetedRoute.snapshot.params['id'];
    if(id){
      this.employeService.get(id).subscribe({
        next: employe => {
          this.form = employe;
        }
      })
    }
  
  }

  constructor(private employeService: EmployeService,
    private router: Router,
    private toast: NotificationServiceService,
    private activetedRoute: ActivatedRoute){}

  
onSubmit(): void {
  // const { prenomEmploye, nomEmploye, telEmploye } = this.form;
 if(!this.form.id){
   this.employeService.addEmploye(this.form).subscribe({
     next: data => {
       console.log(data);
       this.toast.showSuccess("Employe ajouté avec succès !!", "Ajout");
       this.isSuccessful = true;
       if(this.isSuccessful=true){
       this.router.navigate(['/employe']);
       this.successMessage = "Employe enrégistre avec succès !";
       }
     },
     error: err => {
       this.errorMessage = err.error.message;
       this.toast.showError("Employe n'a pas ajouté !", "Erreur");
       console.log(this.errorMessage);
     }
   });
 }else{
   this.employeService.update(this.form.id, this.form).subscribe({
     next: data => {
       console.log(data);
       this.toast.showSuccess("Employe modifié avec succès !!", "Edit");
       this.isSuccessful = true;
       if(this.isSuccessful=true){
       this.router.navigate(['/employe']);
       this.successMessage = "Employe enrégistre avec succès !";
       }
     },
     error: err => {
       this.errorMessage = err.error.message;
       this.toast.showError("Employe n'a pas été modifié !", "Erreur");
       console.log(this.errorMessage);
     }
   });
 }
 
 }
 

}
