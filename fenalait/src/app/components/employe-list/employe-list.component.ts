import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.scss']
})
export class EmployeListComponent implements OnInit {

  employes: Employe[] = [];
  titre = '';
  currentIndex = -1;
  errorMessage!: string;
  message!: string;
  selectedCltToDelete= -1;

  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];

  form: any = {
    firstName: '',
    lastName: '',
    titre:'',
    telEmploye:''
  };

  constructor(private employeService: EmployeService,
    private router: Router,
    private notifyService: NotificationServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getRequestParams(searchTitre: string , page: number, pageSize: number): any {
    let params: any = {};

    if(searchTitre){
      params[`titre`] = searchTitre;
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
    
    const params = this.getRequestParams(this.titre, this.page, this.pageSize);

    this.employeService.getAllEmploye(params)
      .subscribe({
        next: (response: any) =>{
          const { employes, totalItems } = response.content;
          this.employes = response.content;
          this.count = totalItems;
          console.log(this.employes);
          
        },
        error: err =>{
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
          
        }
      });
  }

  update(id: any): void {
    this.router.navigate(['addEmploye', id]);
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

   
  selectedEmployePourSupprimer(id: number): void{
    this.selectedCltToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedCltToDelete !== -1) {
      this.employeService.delete(this.selectedCltToDelete)
      .subscribe({
        next: (res) =>{
          //this.refreshList();
          console.log(res);
          this.notifyService.showError("Client supprimer avec succès !", "Suppréssion")
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

  annulerSuppressionEmploye(): void{
    this.selectedCltToDelete = -1;
  }

  searchEmployeName(){
    if(this.titre == ''){
      this.getAll();
    }else{
      this.employes = this.employes.filter( res => {
        return res.titre?.toLocaleLowerCase().match(this.titre.toLocaleLowerCase());
      })
    }
  }

  searchEmploye(): void {
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
