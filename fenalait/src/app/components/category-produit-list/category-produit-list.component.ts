import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryProduitService } from 'src/app/services/category-produit.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category-produit-list',
  templateUrl: './category-produit-list.component.html',
  styleUrls: ['./category-produit-list.component.scss']
})
export class CategoryProduitListComponent implements OnInit{

  errorMessage!: string;
  catprods!: Category[];
  currentClient: Category = {};
  currentIndex = -1;
  selectedProdtToDelete? = -1;
  nom = '';
  closeResult!:string;
  message = '';

 
  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];

  
  form: any = {
    nom:''
  };
  isSuccessful = false;
  isSignUpFailed = false;

  constructor(private catprodService: CategoryProduitService,
    private router: Router,
    private notifyService: NotificationServiceService){}
  
  ngOnInit(): void {
    this.getAllCategoryProd();
  }

  getRequestParams(searchName: String, page: number, pageSize: number): any {
    let params : any = {};
  
    if(searchName){
      params[`nom`]= searchName;
    }
  
    if(page){
      params[`page`] = page - 1;
    }
  
    if(pageSize){
      params[`size`] = pageSize;
    }
    return params;
   }
  
   editCatProd(id: number): void{
    this.router.navigate(['catProd']);
   } 

  getAllCategoryProd(): void{
    const params = this.getRequestParams(this.nom, this.page, this.pageSize);

    this.catprodService.getAll(params)
    .subscribe({
      next: (response: any) =>{
        const {catprods, totalElements} = response.content;
        this.catprods = response.content;
        this.count = response.total;
        console.log('response ', response);
      },
      error: (err) =>{
        this.errorMessage = err.error.message;
        console.log(this.errorMessage); 
      }
    });
  }

  
  hadlePageChange(event: number): void {
    this.page = event;
    this.getAllCategoryProd();
  }

  hadlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllCategoryProd();
  }

  selectedClientPourSupprimer(id: number): void{
    this.selectedProdtToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedProdtToDelete !== -1) {
      this.catprodService.delete(this.selectedProdtToDelete)
      .subscribe({
        next: (res) =>{
          let index = this.catprods.indexOf(this.currentClient.id);
          this.catprods.splice(index, 1);
          this.notifyService.showSuccess("Client supprimé avec succès!", "Suppréssion");
          this.getAllCategoryProd();
          
        },
        error: err => {
          this.message = err.error.message;
          this.notifyService.showError(this.message, "Erreur");
          //console.log(this.message);
        }
      });
    }
  }

  annulerSuppressionClient(): void{
    this.selectedProdtToDelete = -1;
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Client modifier avec succès !!", "Edit")
  }

  
  searchClients(keyword:string): Observable<Category[]>{
    let catprods = this.catprods.filter(c=>c.nom!.includes(keyword));
    return of(catprods);
  }

  searchCatProdtName(){
    if(this.nom == ''){
      this.getAllCategoryProd();
    }else{
      this.catprods = this.catprods.filter( res => {
        return res.nom?.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      })
    }
  }

}
