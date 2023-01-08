import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
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
  closeResult!:string;
  
  constructor( private httpClient: HttpClient, 
    private modalService:NgbModal,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(){
    this.clientService.getAllClient()
      .subscribe({
      next: (data) =>{
        this.clients = data;
        console.log('Donnee', data);
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

  searchClient(): void {
    this.currentClient = {};
    this.currentIndex = -1;

    this.clientService.findClient(this.clients)
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


