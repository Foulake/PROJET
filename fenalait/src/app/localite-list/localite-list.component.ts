import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Localite } from '../models/localite';
import { LocaliteService } from '../services/localite.service';
import{Router} from '@angular/router';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-localite-list',
  templateUrl: './localite-list.component.html',
  styleUrls: ['./localite-list.component.scss']
})
export class LocaliteListComponent implements OnInit {

  errorMessage!: string;
  localites: Localite[] = [];
  currentLocalite: Localite = {};
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
    description:''

    
  };
  
  //  @Input() currentLocalites: Localite = {
  //   nom: '',
  //   description:''

  //  };

  constructor( private httpClient: HttpClient,
    private localiteService: LocaliteService, private router :Router,
    private notifyService: NotificationServiceService ) { }

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
  
      this.localiteService.getAllLocalite(params)
    
        .subscribe({
          next: (response: any) =>{
            const { localites, totalItems } = response.content;
            this.localites = response.content;
            this.count = totalItems;
            console.log(this.localites);
            
          },
          error: err =>{
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
            
          }
        });
    }
  
    updateLocalite(id: any): void {
      this.router.navigate(['updateLocalite', id]);
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
  
     
    selectedLocalitePourSupprimer(id: number): void{
      this.selectedCltToDelete = id;
  }
  
    confirmDelete(): void{
      if(this.selectedCltToDelete !== -1) {
        this.localiteService.delete(this.selectedCltToDelete)
        .subscribe({
          next: (res) =>{
          
            console.log(res);
            this.notifyService.showError("Localite supprimer avec succès !", "Suppréssion")
        
            this.getAll();
            
            
          },
          error: err => {
            this.errorMessage = err.error.message;
            
          }
        });
      }
    }
  
    annulerSuppressionLocalite(): void{
      this.selectedCltToDelete = -1;
    }
  
    searchLocalite(): void {
      this.page = 1;
      this.getAll();
      
    }
  
  
  }

  