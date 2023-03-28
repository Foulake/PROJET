import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/user';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  users!: User[];
  prenom = "";
  currentIndex = -1;
  errorMessage!: string;
  message!: string;
  selectedCltToDelete= -1;

  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];
  @Output() userAdded= new EventEmitter();
  @Input() currentUser: User = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    roleName: '',
    enabled: undefined
  };

  constructor(private autService: AuthService,
    private router: Router,
    private notification: NotificationServiceService){}

  
    ngOnInit(): void {
      this.getAll();
    }
    
  editUser(id: number): void {
    this.router.navigate(['updateUser', id])
  }
  
  update(): void {
    this.message = '';
    this.autService.update(this.currentUser.id, this.currentUser)
    .subscribe({
      next: response =>{
        this.message = response.message? response.message : 'Cet utilisateur a été modifier avec succès !' ;
      },
      error: err =>{
        this.errorMessage= err.err.message;
      }
    });
  }


  getRequestParams(searchPrenom: String, page: number, pageSize: number): any {
    let params : any = {};
  
    if(searchPrenom){
      params[`prenom`]= searchPrenom;
    }
  
    if(page){
      params[`page`] = page - 1;
    }
  
    if(pageSize){
      params[`size`] = pageSize;
    }
    return params;
   }

   getAll(): void {
    const params = this.getRequestParams(this.prenom, this.page, this.pageSize);

    this.autService.getAllUsers(params)
      .subscribe({
        next: (response: any) =>{
          const {users, totalItems} = response.content;
          this.users= response.content;
          this.count= response.total;
          console.log('response :', response.content);
          
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
          
        }
      });
    
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

  searchUserByName(): void{
    this.page = 1;
    this.getAll();
  }

  selectedUsertPourSupprimer(id: number): void{
    this.selectedCltToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedCltToDelete !== -1) {
      this.autService.delete(this.selectedCltToDelete)
      .subscribe({
        next: (res) =>{
          this.notification.showSuccess("Client supprimer avec succès !",'Suppresion')
          this.userAdded.emit();
        },
        error: err => {
          this.message = err.error.message;
          console.log(this.message);
        }
      });
    }
  }

  annulerSuppressionUser(): void{
    this.selectedCltToDelete = -1;
  }

  searchUserName(){
    if(this.prenom == ''){
      this.getAll();
    }else{
      this.users = this.users.filter( res => {
        return res.prenom?.toLocaleLowerCase().match(this.prenom.toLocaleLowerCase());
      })
    }
  }

}
