import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs!:Fournisseur[];
  closeResult!:string;
  private httpClient!: HttpClient;
  constructor(  httpClient: HttpClient, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getFournisseurs();
  }
  getFournisseurs(){
    this.httpClient.get<any>('http://localhost:8181/api/v1/fournisseurs/getAll').subscribe(
    response =>{
      console.log(response);
      this.fournisseurs = response;
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
    const url = 'http://localhost:8181/api/v1/fournisseurs/add';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
}

