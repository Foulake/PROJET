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
  result: number = 0;

  isFieldDisabled: boolean = true;

  toggleField(): void {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.calcul()
  }
  
  calcul(): void{
    console.log(" qte", this.vente.quantite);
    console.log(" price", this.produit.price);
    console.log("pourcentage", this.vente.pourcentage);

    if(this.produit.id && this.vente.quantite != null){
      if(this.vente.remise){
        this.result = (this.vente.quantite! * this.produit.price!) - (this.vente.quantite! * this.produit.price! * this.vente.pourcentage!)/100;
      }else{
        this.vente.pourcentage = 0;
        this.result = (this.vente.quantite! * this.produit.price!);
      }
      console.log("resulta", this.result);
      
    }
    
  }

constructor( private produitService: ProduitService,
  private router: Router,
  private clientService: ClientService,
  private venteService: VenteService,
  private notifyService: NotificationServiceService,
  private route: ActivatedRoute){}  
  
  
  ngOnInit(): void {
    this.vente.produitId = 0;
    this.vente.clientId = 0;

    this.clientService.getAllSmall()
     .subscribe({
      next: (res: any) => {
        this.listClient = res.content;
       console.log('res ', this.listClient);
        
      }
   });

     this.produitService.getAllSmal()
       .subscribe({
        next: (res: any) =>{
          this.listProduit = res.content;
          console.log(this.listProduit);
        }
     });

    //On recupère id de la vente 
    const venteId = this.route.snapshot.params['venteId'];
     console.log('id =', venteId);
    
        if(!venteId){
          this.pageTitle= 'Ajouter une vente';
        }else{
          this.venteService.get(venteId).subscribe({
            next: (data: any) => {
              this.vente = data;
              this.onChange(this.vente.produitId);
              this.calcul();
              this.pageTitle= 'Modifier une vente';
              console.log('test ', data);
            }
          }); 
        }
  }

  onChange(idProduit: any) {
    console.log("produit choisis ",idProduit);
    this.produitService.get(idProduit).subscribe({
      next: (data: any) => {
        this.produit = data;

        this.calcul();
      }
               
      });
  }
  
onSubmit(): void {
  console.log("vente contenu",this.vente);
  if(!this.vente.id){
    //var body = JSON.parse(body)
   this.venteService.addVente(this.vente).subscribe({
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



