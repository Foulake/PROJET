import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Produit } from 'src/app/models/produit';
import { NotificationServiceService } from 'src/app/services/notification.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit{

  @Output() productAdded = new EventEmitter();
  @Input()
  errorMessage!: string;
  produits!: Produit[];
  currentProduit: Produit = {};
  currentIndex = -1;
  selectedPrtToDelete? = -1;
  nomPrdt = '';
  closeResult!:string;
  message = '';

  form: any = {
    nomPrdt: '',
    qte: '',
    dateExp: '',
    code: '',
    price: '',
    categoryNom: '',
    magasinNom: ''
  };

  page= 1;
  count =0;
  pageSize= 5;
  totalPages=[5,10, 15];
  
  searFormGroup!: FormGroup;

  ngOnInit(): void {

    this.searFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });

    this.getAll();
  }

  constructor(private produitService: ProduitService,
    private router: Router,
    private fb: FormBuilder,
    private notifyService: NotificationServiceService){}

  editProduit(id: number): void{
    this.router.navigate(['addProduit', id]);
  }

  getRequestParams(searchNomPrdt: String, page: number, pageSize: number): any {
    let params : any = {};
  
    if(searchNomPrdt){
      params[`nomPrdt`]= searchNomPrdt;
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
    const params = this.getRequestParams(this.nomPrdt, this.page, this.pageSize);

    this.produitService.getAllProduct(params)
      .subscribe({
      next: (response:any) =>{
        const { produits, totalItems} = response.content;
        this.produits = response.content;
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
    this.getAll();
  }

  hadlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAll();
  }

  selectedProduitPourSupprimer(id: number): void{
    this.selectedPrtToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedPrtToDelete !== -1) {
      this.produitService.delete(this.selectedPrtToDelete)
      .subscribe({
        next: (res) =>{
          console.log(res);
          this.notifyService.showSuccess("Client supprimer avec succès !", "Suppréssion");
          this.productAdded.emit();
          
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.notifyService.showError(this.errorMessage, 'Erreur')
          //console.log(this.message);
        }
      });
    }
  }

  annulerSuppressionProduit(): void{
    this.selectedPrtToDelete = -1;
  }

  searchProduits(keyword:string): Observable<Produit[]>{
    let produits = this.produits.filter(c=>c.nomPrdt!.includes(keyword));
    return of(produits);
  }

  handleSearchProduits(){
    let keyword = this.searFormGroup.value.keyword;
    this.searchProduits(keyword).subscribe({
      next: (response) =>{
        this.produits = response;
        console.log(this.produits);
        
      }
    });
  }

  searchProductName(){
    if(this.nomPrdt == ''){
      this.getAll();
    }else{
      this.produits = this.produits.filter( res => {
        return res.nomPrdt?.toLocaleLowerCase().match(this.nomPrdt.toLocaleLowerCase());
      })
    }
  }


}
