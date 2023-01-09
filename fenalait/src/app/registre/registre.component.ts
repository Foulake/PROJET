import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {

  form: any = {
      nom: '',
      prenom:'',
      email:'',
      password:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { prenom, nom, email, password } = this.form;

    this.authService.register(prenom, nom, email, password).subscribe({
      next: data => {
        console.log(data);
        if(this.isSuccessful=true){
          this.route.navigate(['/registre']);
          this.successMessage = " Utilisateur enrégistre avec succès !";
          }
        //this.isSignUpFailed = false;
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}