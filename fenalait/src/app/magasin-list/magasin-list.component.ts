import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magasin } from '../models/magasin';
import { MagasinService } from '../services/magasin.service';
import { NotificationServiceService } from '../services/notification.service';

@Component({
  selector: 'app-magasin-list',
  templateUrl: './magasin-list.component.html',
  styleUrls: ['./magasin-list.component.scss']
})
export class MagasinListComponent implements OnInit {

  errorMessage!: string;
  magasins: Magasin[] = [];
  currentMagasin: Magasin = {};
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
    nomMagasin: '',
   

    
  };
 
  constructor( private httpClient: HttpClient,
    private magasinService: MagasinService, private router :Router,
    private notifyService: NotificationServiceService ) { }

    ngOnInit(): void {
      this.getAll();
    }
  
    getRequestParams(searchNomMagasin: string , page: number, pageSize: number): any {
      let params: any = {};
  
      if(searchNomMagasin){
        params[`nomMagasin`] = searchNomMagasin;
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
      
      const params = this.getRequestParams(this.nom ,this.page, this.pageSize);
  
      this.magasinService.getAllMagasin(params)
    
        .subscribe({
          next: (response: any) =>{
            const { magsins, totalItems } = response.content;
            this.magasins = response.content;
            this.count = totalItems;
            console.log(this.magasins);
            
          },
          error: err =>{
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
            
          }
        });
    }
  
    updateMagasin(id: any): void {
      this.router.navigate(['updateMagasin', id]);
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
  
     
    selectedMagasinPourSupprimer(id: number): void{
      this.selectedCltToDelete = id;
  }
  
    confirmDelete(): void{
      if(this.selectedCltToDelete !== -1) {
        this.magasinService.delete(this.selectedCltToDelete)
        .subscribe({
          next: (res) =>{
          
            console.log(res);
            this.notifyService.showError("Magasin supprimer avec succès !", "Suppréssion")
        
            this.getAll();
            
            
          },
          error: err => {
            this.errorMessage = err.error.message;
            
          }
        });
      }
    }
  
    annulerSuppressionMagasin(): void{
      this.selectedCltToDelete = -1;
    }
  
    searchMagasin(): void {
      this.page = 1;
      this.getAll();
      
    }
  
  
  }

  

