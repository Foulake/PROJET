import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Produit } from 'src/app/models/produit';
import { Vente } from 'src/app/models/vente';
import { ClientService } from 'src/app/services/client.service';
import { NotificationServiceService } from 'src/app/services/notification.service';
import { ProduitService } from 'src/app/services/produit.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html',
  styleUrls: ['./add-vente.component.scss']
})
export class AddVenteComponent  implements OnInit{
  vente: Vente = {};
  client: Client = {};
  produit: Produit = {};
  listClient: Array<Client> = [];
  listProduit: Array<Produit> = [];
  public pageTitle!: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';

constructor( private produitService: ProduitService,
  private router: Router,
  private clientService: ClientService,
  private venteService: VenteService,
  private notifyService: NotificationServiceService,
  private route: ActivatedRoute){}  
  
  
  ngOnInit(): void {
    this.vente.produitId = 0;
    this.vente.clientId = 0;

  //  this.clientService.getAll()
  //    .subscribe({
  //     next: (res: any) => {
  //       this.listClient = res.content;
  //       console.log('res ', this.listClient);
        
  //     }
  //   });

  //    this.produitService.get()
  //      .subscribe({
  //       next: (res: any) =>{
  //          this.listProduit = res.content;
  //         console.log(this.listProduit);
  //       }
  //      });

    const id = this.route.snapshot.params['id'];
     console.log('id =', id);
     
        if(!id){
          this.pageTitle= 'Ajouter un vente';
        }else{
         
          this.venteService.get(id).subscribe({
            next: (data: any) => {
              this.vente = data;
              this.pageTitle= `Modifier le vente ${this.vente.montant}`;
              console.log('test ', data);
             
              
                     
            }
          }); 
        }
  }


  
onSubmit(): void {
  console.log("vente contenu",this.vente);
  if(!this.vente.id){
    //var body = JSON.parse(body)
   this.produitService.addProduit(this.vente).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("vente ajouté avec succès!", "Ajout");
        if(this.isSuccessful=true){
        this.router.navigate(['/venteListe']);
        this.successMessage = "Vente enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }else{
     this.venteService.update(this.vente.id, this.vente).subscribe({
      next: data => {
        console.log(data);
        this.notifyService.showSuccess("Vente modifié avec succès!", "Edit");
        
        if(this.isSuccessful=true){
        this.router.navigate(['/venteListe']);
        this.successMessage =" Vente enrégistre avec succès !";
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    });
  }
}

}



