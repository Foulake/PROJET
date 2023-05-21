import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { NotificationServiceService } from '../services/notification.service';


@Component({
  selector: 'app-categorie-fournisseur-list',
  templateUrl: './categorie-fournisseur-list.component.html',
  styleUrls: ['./categorie-fournisseur-list.component.scss']
})
export class CategorieFournisseurListComponent {
  errorMessage!: string;
  categorieFournisseurs: CategorieFournisseur[]=[];
  currentCategorieFournisseur: CategorieFournisseur = {};
  currentIndex = -1;
    description = '';
  closeResult!:string;
  message = '';
  selectedCltToDelete= -1;

  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];


  

  
  form: any = {
  
    description:''

    
  };
  constructor( private httpClient: HttpClient,
    private categorieFournisseurService: CategorieFournisseurService,private router: Router,
    private notifyService: NotificationServiceService) { }

    ngOnInit(): void {
      this.getAll();
    }
  
    getRequestParams(searchDescription: string , page: number, pageSize: number): any {
      let params: any = {};
  
      if(searchDescription){
        params[`description`] = searchDescription;
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
      
      const params = this.getRequestParams(this.description, this.page, this.pageSize);
  
      this.categorieFournisseurService.getAllCategorieFournisseur(params)
        .subscribe({
          next: (response: any) =>{
            const { categorieFournisseurs, totalItems } = response.content;
            this.categorieFournisseurs = response.content;
            this.count = totalItems;
            console.log(this.categorieFournisseurs);
            
          },
          error: err =>{
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
            
          }
        });
    }
  
    updatecatFour(id: any): void {
      this.router.navigate(['updatecatFour', id]);
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
    refreshList(): void {
      this.getAll();
      this.currentCategorieFournisseur = {}
      this.currentIndex = -1;
    }
  
     
    selectedCategorieFournisseurPourSupprimer(id: number): void{
      this.selectedCltToDelete = id;
  }
  
    confirmDelete(): void{
      if(this.selectedCltToDelete !== -1) {
        this.categorieFournisseurService.delete(this.selectedCltToDelete)
        .subscribe({
          next: (res) =>{
            this.refreshList();
            console.log(res);
            this.notifyService.showError("categoriefournisseur supprimer avec succès !", "Suppréssion")
            this.message= "CategorieFour supprimer avec succès !"
            this.getAll();
            this.router.navigate(['/categorieFournisseur']);
            window.location.reload();
            
          },
          error: err => {
            this.errorMessage = err.error.message;
            //console.log(this.message);
          }
        });
      }
    }
  
    annulerSuppressionCategorieFournisseur(): void{
      this.selectedCltToDelete = -1;
    }
    searchCatFourName(){
      if(this.description == ''){
        this.getAll();
      }else{
        this.categorieFournisseurs = this.categorieFournisseurs.filter( res => {
          return res.description?.toLocaleLowerCase().match(this.description.toLocaleLowerCase());
        })
      }
    }
  
    searchCatfournisseur(): void {
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
  