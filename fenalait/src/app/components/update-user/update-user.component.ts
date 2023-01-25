import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit{

  constructor(private authService: AuthService,
    private toast: NotificationServiceService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.successMesg = '';
    this.getUser(this.route.snapshot.params['id']);
  }

  @Input() currentUser: User = {
    prenom: '',
    nom: '',
    email: '',
    password: ''
  };

  successMesg= '';
  msg= '';


  getUser(id: any): void {
    this.authService.get(id)
      .subscribe({
        next: data =>{
          this.currentUser = data;
          console.log(data);
          
        },
        error: err =>{
          this.msg = err.error.message;
          console.log(this.msg);
          
        }
      })
  }

  update(): void {
    
    this.successMesg = '';

    this.authService.update(this.currentUser.id, this.currentUser)
    .subscribe({
      next: Response =>{
        this.toast.showSuccess("Utilisateur modifié avec succès", "Edit");
        this.successMesg = Response.message? Response.message : 'Cet utilisateur a été modifier avec succès !' ;
        this.router.navigate(['user']);
      },
      error: err =>{
        this.msg= err.error.message;
        this.toast.showError("Erreur veuillez réesssayé !", "Erreur");
        console.log(this.msg);
        
      }
    });
  }

}
