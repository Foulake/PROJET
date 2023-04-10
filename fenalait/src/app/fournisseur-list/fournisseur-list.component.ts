import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fournisseur } from '../models/fournisseur';
import { HttpClient } from '@angular/common/http';
import { FournisseurService } from '../services/fournisseur.service';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../services/notification.service';



@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {



   errorMessage!: string;
  fournisseurs: Fournisseur[]=[];
  currentFournisseur: Fournisseur = {};
  currentIndex = -1;
    nom = '';
  closeResult!:string;
  message = '';
  selectedCltToDelete= -1;

  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];


  
  form: any = {
    nom: '',
    prenom:'',
    tel:'',
    dateFour:'',
    categoryFourNom:''
    


    
  };
  isSuccessful = false;
  isSignUpFailed = false;
  @Input() currentFournisseurs: Fournisseur = {
    nom: '',
    prenom:'',
    tel:'',
    categoryFourNom:'',
  
   };

  constructor( private httpClient: HttpClient,
    private fournisseurService: FournisseurService,
    private router: Router,
    private notifyService: NotificationServiceService) { }

    ngOnInit(): void {
      this.getAll();
    }
  
    getRequestParams(searchNom: string , page: number, pageSize: number): any {
      let params: any = {};
  
      if(searchNom){
        params[`nom`] = searchNom;
      }
  
      if(page){
        params[`page`] = page - 1; 
      }
  
      if(pageSize){
        params[`size`] = pageSize;
      }
  
      return params;
    }
  
    getAll(): void{
      
      const params = this.getRequestParams(this.nom, this.page, this.pageSize);
  
      this.fournisseurService.getAllFournisseur(params)
        .subscribe({
          next: (response: any) =>{
            const { fournisseurs, totalItems } = response.content;
            this.fournisseurs = response.content;
            this.count = totalItems;
            console.log(this.fournisseurs);
            
          },
          error: err =>{
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
            
          }
        });
    }
  
    updateFour(id: any ): void {
      this.router.navigate(['addFournisseur', id]);
    }
  
    hadlePageChange(event: number): void {
      this.page = event;
      this.getAll();
    }
  
    hadlePageSizeChange(event: any): void {
      this.pageSize = event.target.value;
      this.page= 1;
      this.getAll();
    }
  
     
    selectedFournisseurPourSupprimer(id: number): void{
      this.selectedCltToDelete = id;
  }
  
    confirmDelete(): void{
      if(this.selectedCltToDelete !== -1) {
        this.fournisseurService.delete(this.selectedCltToDelete)
        .subscribe({
          next: (res) =>{
            //this.refreshList();
            console.log(res);
            this.notifyService.showError("fournisseur supprimer avec succès !", "Suppréssion")
            //this.message= "Client supprimer avec succès !"
            this.getAll();
            //this.route.navigate(['/client']);
            //window.location.reload();
            
          },
          error: err => {
            this.errorMessage = err.error.message;
            //console.log(this.message);
          }
        });
      }
    }
  
    annulerSuppressionFournisseur(): void{
      this.selectedCltToDelete = -1;
    }
  
    searchFournisseur(): void {
      this.page = 1;
      this.getAll();
      /**this.currentClient = {};
      //this.currentIndex = -1;
  
      this.clientService.findClient(this.titreClient)
      .subscribe({
        next: (response) =>{
          this.clients = response;
          console.log(response);
          
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          console.log(err);
          
        }
      })*/
    }
  
  
  }
  