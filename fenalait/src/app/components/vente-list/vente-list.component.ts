import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Vente } from 'src/app/models/vente';
import { NotificationServiceService } from 'src/app/services/notification.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.scss']
})
export class VenteListComponent implements OnInit {
  
  @Output() venteAdded = new EventEmitter();
  @Input()
  errorMessage!: string;
  ventes!: Vente[];
  currentVente: Vente = {};
  currentIndex = -1;
  selectedPrtToDelete? = -1;
  montant = '';
  date = '';
  closeResult!:string;
  message = '';

  form: any = {
    montant: '',
    quantite: '',
    remise: false,
    date: '',
    clientNom: '',
    produitNom: ''
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

  constructor(private venteService: VenteService,
    private router: Router,
    private fb: FormBuilder,
    private notifyService: NotificationServiceService){}

  editVente(id: number): void{
    this.router.navigate(['addVente', id]);
  }

  getRequestParams(searchMontant: String, page: number, pageSize: number): any {
    let params : any = {};
  
    if(searchMontant){
      params[`montant`]= searchMontant;
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
    const params = this.getRequestParams(this.montant, this.page, this.pageSize);

    this.venteService.getAllVent(params)
      .subscribe({
      next: (response:any) =>{
        const { ventes, totalItems} = response.content;
        this.ventes = response.content;
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

  selectedVentePourSupprimer(id: number): void{
    this.selectedPrtToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedPrtToDelete !== -1) {
      this.venteService.delete(this.selectedPrtToDelete)
      .subscribe({
        next: (res) =>{
          this.ngOnInit();
          console.log(res);
          this.notifyService.showSuccess("vente supprimer avec succès !", "Suppréssion");
          this.venteAdded.emit();
          
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.notifyService.showError(this.errorMessage, 'Erreur')
          //console.log(this.message);
        }
      });
    }
  }

  annulerSuppressionVente(): void{
    this.selectedPrtToDelete = -1;
  }

  searchVenteName(){
    if(this.date == ''){
      this.getAll();
    }else{
       this.ventes = this.ventes.filter( res => {
         return res.date?.toLocaleString().match(this.date);
       })
    }
  }


}
