import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Approvi } from 'src/app/models/approvi';
import { ApproviService } from 'src/app/services/approvi.service';
import { NotificationServiceService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-approvi-list',
  templateUrl: './approvi-list.component.html',
  styleUrls: ['./approvi-list.component.scss']
})
export class ApproviListComponent  implements OnInit{


  @Output() approviAdded = new EventEmitter();
  @Input()
  errorMessage!: string;
  approvis!: Approvi[];
  currentApprovi: Approvi = {};
  currentIndex = -1;
  selectedPrtToDelete? = -1;
  qteAppro = '';
  closeResult!:string;
  message = '';

  form: any = {
  
    qteAppro:'',
    qteTotal:'',
    dateAppro:'',
    userNom:'',
    produitNom:'',
    fournisseurNom:'',
   
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

  constructor(private approviService: ApproviService,
    private router: Router,
    private fb: FormBuilder,
    private notifyService: NotificationServiceService){}

  editApprovi(id: number): void{
    this.router.navigate(['addApprovi', id]);
  }

  getRequestParams(searchQteAppro: String, page: number, pageSize: number): any {
    let params : any = {};
  
    if(searchQteAppro){
      params[`qteAppro`]= searchQteAppro;
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
    const params = this.getRequestParams(this.qteAppro, this.page, this.pageSize);

    this.approviService.getAllApprovis(params)
      .subscribe({
      next: (response:any) =>{
        const { approvis, totalItems} = response.content;
        this.approvis = response.content;
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

  selectedApproviPourSupprimer(id: number): void{
    this.selectedPrtToDelete = id;
}

  confirmDelete(): void{
    if(this.selectedPrtToDelete !== -1) {
      this.approviService.delete(this.selectedPrtToDelete)
      .subscribe({
        next: (res) =>{
          console.log(res);
          this.notifyService.showSuccess("approvis supprimer avec succès !", "Suppréssion");
          this.approviAdded.emit();
          
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.notifyService.showError(this.errorMessage, 'Erreur')
          //console.log(this.message);
        }
      });
    }
  }

  annulerSuppressionApprovi(): void{
    this.selectedPrtToDelete = -1;
  }

  // searchApprovis(keyword:string): Observable<Approvi[]>{
  //   let approvis = this.approvis.filter(c=>c.nomPrdt!.includes(keyword));
  //   return of(approvis);
  // }

  // handleSearchApprovis(){
  //   let keyword = this.searFormGroup.value.keyword;
  //   this.searchApprovis(keyword).subscribe({
  //     next: (response) =>{
  //       this.approvis = response;
  //       console.log(this.approvis);
        
  //     }
  //   });
  // }

  searchApproviName(){}
  //   if(this.nomPrdt == ''){
  //     this.getAll();
  //   }else{
  //     this.approvis = this.approvis.filter( res => {
  //       return res.nomPrdt?.toLocaleLowerCase().match(this.nomPrdt.toLocaleLowerCase());
  //     })
  //   }
  // }


}

