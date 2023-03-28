import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieFournisseurService } from '../services/categorie-fournisseur.service';
import { FournisseurService } from '../services/fournisseur.service';


@Component({
  selector: 'app-updatefournisseur',
  templateUrl: './updatefournisseur.component.html',
  styleUrls: ['./updatefournisseur.component.scss']
})
export class UpdatefournisseurComponent implements OnInit {
  form: any = {
    nom: '',
      prenom: '',
      tel: '',
      dateFour:'',
      categoryFourId:'',
      categoryFourNom:''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  successMessage = '';
categorieFournisseurs: any[]=[];
  
  constructor(private fournisseurService: FournisseurService, private categorieFournisseurService:CategorieFournisseurService
    ,private route:ActivatedRoute
   , private router: Router){}
 
  

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
        if(id){
          this.fournisseurService.get(id).subscribe({
            next: fournisseur => {
              this.form = fournisseur;
            }
          })
        }
  }

onSubmit(): void {

  this.fournisseurService.update(this.form.id, this.form).subscribe({
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





