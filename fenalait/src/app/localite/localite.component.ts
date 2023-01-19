import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { LocaliteService } from '../services/localite.service';

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
    private route: Router, private activetedRoute:ActivatedRoute ){}

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
   // const { prenomClient, nomClient, telClient } = this.form;
  if(!this.form.id){
    this.localiteService.create(this.form).subscribe({
      next: data => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/localite']);
        this.successMessage = "localite enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }else{
    this.localiteService.update(this.form.id, this.form).subscribe({
      next: data => {
        console.log(data);
        //this.isSuccessful = true;
        //this.isSignUpFailed = false;
        if(this.isSuccessful=true){
        this.route.navigate(['/localite']);
        this.successMessage = "localite enrégistre avec succès !";
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
      description: ''
    };
  }
  
  }
  