import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Localite } from '../models/localite';
import { LocaliteService } from '../services/localite.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-localite-list',
  templateUrl: './localite-list.component.html',
  styleUrls: ['./localite-list.component.scss']
})
export class LocaliteListComponent implements OnInit {
  errorMessage!: string;
  localites?: Localite[];
  currentLocalite: Localite = {};
  currentIndex = -1;
    nom = '';
  closeResult!:string;
  message = '';

  
  form: any = {
    nom: '',
    description:''

    
  };
  isSuccessful = false;
  isSignUpFailed = false;

   @Input() currentLocalites: Localite = {
    nom: '',
    description:''

   };

  constructor( private httpClient: HttpClient,
    private localiteService: LocaliteService, private router :Router) { }

  ngOnInit(): void {
    this.message= '';
     this.getAllLocalites();
  }

  
onSubmit(): void {
   
   this.localiteService.create(this.form).subscribe({
     next: data => {
       console.log(data);
       this.isSuccessful = true;
       alert('localites enregistrer avec success');
       this.isSignUpFailed = false;
     },
     error: err => {
       this.errorMessage = err.error.message;
       console.log(this.errorMessage);
       this.isSignUpFailed = true;
     }
   });
 }
  updateLocalite(id:number){
    this.router.navigate(['updateLocalite', id]);

  }

  getAllLocalites(){
    this.localiteService.getAllLocalite()
      .subscribe({
      next: (data) =>{
        this.localites = data;
        console.log('Data', data);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  refreshList(): void {
    this.getAllLocalites();
    this.currentLocalite = {}
    this.currentIndex = 1;
  }

  setActivetedLocalite(localite: Localite, index: number){
    this.currentLocalite= localite;
    this.currentIndex = -1;
  }

  removeAllLocalite(): void {
    this.localiteService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: err => {
        this.errorMessage= err.error.message;
      }
    });
  }

  removeSelected(): void {
    this.localiteService.delete(this.currentLocalite.id)
    .subscribe({
      next: (res) =>{
        console.log(res);
        res.message ? res.message : 'Cet localite supprimer avec succès !';
        //this.router.navigate()
        this.refreshList();
      },
      error: err => {
        this.message = this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        
      }
    })
  }

  searchLocalite(): void {
    this.currentLocalite = {};
    this.currentIndex = -1;

    this.localiteService.findLocalite(this.currentLocalite)
    .subscribe({
      next: (data) =>{
        this.localites = data;
        console.log(data);
        
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(err);
        
      }
    })
  }
 
  deleteLocalite(id:number){
    this.localiteService.delete(id).subscribe(data=>{
      console.log(data);
     this.getAllLocalites();

    })

  }
}
