import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})



export class ClientListComponent implements OnInit {

  @Output() clientAdded = new EventEmitter();
  errorMessage!: string;
  clients!: Client[];
  currentClient: Client = {};
  currentIndex = -1;
  selectedCltToDelete = -1;
  prenomClient = '';
  closeResult!:string;
  message = '';

 
  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];

  
  form: any = {
    nomClient: '',
    prenomClient:'',
    telClient:''
    
  };
  isSuccessful = false;
  isSignUpFailed = false;

  searFormGroup!: FormGroup;
/** 
   @Input() currentClients: Client = {
    nomClient: '',
    prenomClient:'',
    telClient:''
   }; */

  constructor( private clientService: ClientService,
    private route: Router,
    private notifyService : NotificationServiceService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.searFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.getAllClients();
    //this.message= '';
  }
   
 editClient(id: number){
  this.route.navigate(['addClient', id]);
}

  
 getRequestParams(searchPrenomClient: String, page: number, pageSize: number): any {
  let params : any = {};

  if(searchPrenomClient){
    params[`prenomClient`]= searchPrenomClient;
  }

  if(page){
    params[`page`] = page - 1;
  }

  if(pageSize){
    params[`size`] = pageSize;
  }
  return params;
 }

getAllClients(): void{
    const params = this.getRequestParams(this.prenomClient, this.page, this.pageSize);

    this.clientService.getAllClient(params)
      .subscribe({
      next: (response:any) =>{
        const { clients, totalItems} = response.content;
        this.clients = response.content;
        this.count = response.total;
        console.log('response', response.content);
      },
      error: (err) =>{
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    });
  }

  hadlePageChange(event: number): void {
    this.page = event;
    this.getAllClients();
  }

  hadlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllClients();
  }


  refreshList(): void {
    this.getAllClients();
    this.currentClient = {}
    this.currentIndex = -1;
  }

  setActivetedClient(client: Client, index: number){
    this.currentClient= client;
    this.currentIndex = index;
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
    this.clientService.delete(this.currentIndex)
    .subscribe({
      next: (res) =>{
        console.log(res);
        res.message ? res.message : 'Client supprimé avec succès !';
        this.route.navigate(['/client']);
        this.refreshList();
      },
      error: err => {
        this.message = this.errorMessage = err.error.message;
        this.notifyService.showError(this.message, "Erreur");
        console.log(this.errorMessage);
      }
    });
  }

  selectedCltPourSupprimer(id: number): void{
    this.selectedCltToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedCltToDelete !== -1) {
      this.clientService.delete(this.selectedCltToDelete)
      .subscribe({
        next: (res) =>{
          this.ngOnInit();
          console.log('data', res);
          this.notifyService.showSuccess("Client supprimé avec succès!", "Suppréssion");
          this.clientAdded.emit();
        },
        error: err => {
          this.message = err.error.message;
           }
      });
    }
  }

  annulerSuppressionClient(): void{
    this.selectedCltToDelete = -1;
  }

  searchClients(keyword:string): Observable<Client[]>{
    let clients = this.clients.filter(c=>c.prenomClient!.includes(keyword));
    return of(clients);
  }

  handleSearchClients(){
    let keyword = this.searFormGroup.value.keyword;
    this.searchClients(keyword).subscribe({
      next: (response) =>{
        this.clients = response;
        console.log(this.clients);
        
      }
    });
  }

  searchClientName(){
    if(this.prenomClient == ''){
      this.getAllClients();
    }else{
      this.clients = this.clients.filter( res => {
        return res.prenomClient?.toLocaleLowerCase().match(this.prenomClient.toLocaleLowerCase());
      })
    }
  }

  searchClient(): void {
    this.page = 1;
    this.getAllClients();
    /**this.currentClient = {};
    //this.currentIndex = -1;

    this.clientService.findClient(this.prenomClient)
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


