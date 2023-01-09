import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  
  errorMessage!: string;
  clients?: Client[];
  currentClient: Client = {};
  currentIndex = -1;
  prenomClient = '';
  closeResult!:string;
  message = '';

  
  form: any = {
    nomClient: '',
    prenomClient:'',
    telClient:''
    
  };
  isSuccessful = false;
  isSignUpFailed = false;

   @Input() currentClients: Client = {
    nomClient: '',
    prenomClient:'',
    telClient:''
   };

  constructor( private httpClient: HttpClient,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.message= '';
     this.getAllClients();
  }

  
onSubmit(): void {
  // const { prenomClient, nomClient, telClient } = this.form;
 
   this.clientService.create(this.form).subscribe({
     next: data => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
     },
     error: err => {
       this.errorMessage = err.error.message;
       console.log(this.errorMessage);
       this.isSignUpFailed = true;
     }
   });
 }

  getAllClients(){
    this.clientService.getAllClient()
      .subscribe({
      next: (data) =>{
        this.clients = data;
        console.log('Data', data);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  refreshList(): void {
    this.getAllClients();
    this.currentClient = {}
    this.currentIndex = 1;
  }

  setActivetedClient(client: Client, index: number){
    this.currentClient= client;
    this.currentIndex = -1;
  }

  removeAllClient(): void {
    this.clientService.deleteAll()
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
    this.clientService.delete(this.currentClients.id)
    .subscribe({
      next: (res) =>{
        console.log(res);
        res.message ? res.message : 'Cet client supprimer avec succès !';
        //this.router.navigate()
        this.refreshList();
      },
      error: err => {
        this.message = this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        
      }
    })
  }

  searchClient(): void {
    this.currentClient = {};
    this.currentIndex = -1;

    this.clientService.findClient(this.prenomClient)
    .subscribe({
      next: (data) =>{
        this.clients = data;
        console.log(data);
        
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(err);
        
      }
    })
  }

   /**  open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
  } 
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8181/api/v1/clients/add';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }*/
  
  }


