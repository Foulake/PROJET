import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieFournisseur } from '../models/categorie-fournisseur';
import { Fournisseur } from '../models/fournisseur';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { FournisseurService } from '../services/fournisseur.service';


@Component({
  selector: 'app-updatefournisseur',
  templateUrl: './updatefournisseur.component.html',
  styleUrls: ['./updatefournisseur.component.scss']
})
export class UpdatefournisseurComponent implements OnInit {
  fournisseur: Fournisseur = {};
  categorieFournisseur:CategorieFournisseur={}
    listCategorieFournisseur: Array<CategorieFournisseur> = [];
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
    ,private route:ActivatedRoute
   , private router: Router){}
 
  

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
        if(id){
          this.fournisseurService.get(id).subscribe({
            next: (data: any) => {
              this.fournisseur = data;
             //this.pageTitle= `Modifier le produit ${this.fournisseur.nom}`;
              console.log('test ', data);}
                     })
        }
  }

onSubmit(): void {

  this.fournisseurService.update(this.fournisseur.id, this.fournisseur).subscribe({
    next: data => {
      console.log(data);
      //this.isSuccessful = true;
      //this.isSignUpFailed = false;
      if(this.isSuccessful=true){
      this.router.navigate(['/fournisseur']);
      this.successMessage = "fournisseur enrégistre avec succès !";
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





