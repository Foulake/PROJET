import { Component, OnInit } from '@angular/core';
import{Client} from '../client';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients!: Client[];
  closeResult!:string;
  private httpClient!: HttpClient;
  constructor(  httpClient: HttpClient, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getClients();
  }
  getClients(){
    this.httpClient.get<any>('http://localhost:8181/api/v1/clients/getAll').subscribe(
    response => {
      console.log(response);
      this.clients = response;
    }
    );
    }
    
    open(content: any) {
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
  }
  
  }


