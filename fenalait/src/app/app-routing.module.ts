import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovissionnementListComponent } from './approvissionnement-list/approvissionnement-list.component';
import { ApprovissionnementComponent } from './approvissionnement/approvissionnement.component';
import { CategorieFournisseurListComponent } from './categorie-fournisseur-list/categorie-fournisseur-list.component';
import { CategorieFournisseurComponent } from './categorie-fournisseur/categorie-fournisseur.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client/client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ChangerMotDePasseComponent } from './components/changer-mot-de-passe/changer-mot-de-passe/changer-mot-de-passe.component';
import { ChangerProfileComponent } from './components/changer-profile/changer-profile/changer-profile.component';
import { EmployeListComponent } from './employe-list/employe-list.component';
import { EmployeComponent } from './employe/employe.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { LocaliteListComponent } from './localite-list/localite-list.component';
import { LocaliteComponent } from './localite/localite.component';
import { LoginComponent } from './login/login.component';

import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MenuComponent } from './menu/menu.component';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { ProduitComponent } from './produit/produit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistreComponent } from './registre/registre.component';
import { AplicationGuard } from './shared/aplication.guard';
import { UpdateLocaliteComponent } from './update-localite/update-localite.component';
import { UpdateCatfourComponent } from './update-catfour/update-catfour.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  
      
  {path:'',
    component:MenuComponent,
    canActivate: [AplicationGuard],
    children:[
      {
        path: "profile", component: ProfileComponent,
        canActivate: [AplicationGuard],
      },
      {
        path: "changerMoDePasse", component: ChangerMotDePasseComponent,
        canActivate: [AplicationGuard],
      },
      {
        path: "changer-profile", component: ChangerProfileComponent,
        canActivate: [AplicationGuard],
      },
      
      { path:"registre",component:RegistreComponent,
        canActivate: [AplicationGuard]
      },
  
      { path:"client",component:ClientListComponent,
        canActivate: [AplicationGuard]
      },
      
      {path:"addClient",component:AddClientComponent,
        canActivate: [AplicationGuard]
      },
      {path:"addClient/:id",component:AddClientComponent,
        canActivate: [AplicationGuard]
      },
      {
        path: "clientListe", component: ClientListComponent,
        canActivate: [AplicationGuard]
      },


      {path:"categorieFournisseur",component:CategorieFournisseurListComponent,
      canActivate: [AplicationGuard]
      },
 
      {path:"addcategorieFournisseur",component:CategorieFournisseurComponent,
       canActivate: [AplicationGuard]
         },
         {path:"updatecatFour/:id",component:UpdateCatfourComponent,
       canActivate: [AplicationGuard]
         },


      { path:"localite",component:LocaliteListComponent,
        canActivate: [AplicationGuard]
      },
      
      {
        path:"addLocalite",component:LocaliteComponent,
        canActivate: [AplicationGuard]
      },
      {path:"updateLocalite/:id",component:UpdateLocaliteComponent,
        canActivate: [AplicationGuard]
    },
      
      {
        path:"fournisseur",component:FournisseurListComponent,
        canActivate: [AplicationGuard]
      },
      
      { path:"addFournisseur",component:FournisseurComponent},
      
      { path:"addProduit",component:ProduitComponent,
        canActivate: [AplicationGuard]
      },
      
      { path:"addUser",component:UserComponent,
        canActivate: [AplicationGuard]
      },

      {path:"user",component:UserComponent},

      

      { 
        path:"magasin",component:MagasinListComponent,
        canActivate: [AplicationGuard]
      },
      
      { 
        path:"addMagasin",component:MagasinComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"employe",component:EmployeListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addEmploye",component:EmployeComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"category",component:CategoryListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addCategory",component:CategoryComponent,
        canActivate: [AplicationGuard]
      },
      { 
        path:"appro",component:ApprovissionnementListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addAppro",component:ApprovissionnementComponent,
        canActivate: [AplicationGuard]
      },
        
      { 
        path:"payer",component:EmployeListComponent,
        canActivate: [AplicationGuard]
      },
      {
          path:"produit",component:ProduitListComponent,
          canActivate: [AplicationGuard]
        },
      { 
        path:"user",component:UserComponent,
        canActivate: [AplicationGuard]
      }
     
    ]
  },
  //{path:'',component:MenuComponent,
  // canActivate: [AplicationGuard]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
