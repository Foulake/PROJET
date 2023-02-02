import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovissionnementListComponent } from './approvissionnement-list/approvissionnement-list.component';
import { ApprovissionnementComponent } from './approvissionnement/approvissionnement.component';
import { CategorieFournisseurListComponent } from './categorie-fournisseur-list/categorie-fournisseur-list.component';
import { CategorieFournisseurComponent } from './categorie-fournisseur/categorie-fournisseur.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddEmployeComponent } from './components/add-employe/add-employe.component';
import { ChangerMotDePasseComponent } from './components/changer-mot-de-passe/changer-mot-de-passe/changer-mot-de-passe.component';
import { ChangerProfileComponent } from './components/changer-profile/changer-profile/changer-profile.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { EmployeComponent } from './components/employe/employe.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { LocaliteListComponent } from './localite-list/localite-list.component';
import { LocaliteComponent } from './localite/localite.component';
import { LoginComponent } from './login/login.component';

import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistreComponent } from './registre/registre.component';
import { AplicationGuard } from './shared/aplication.guard';
import { CategoryProduitListComponent } from './components/category-produit-list/category-produit-list.component';
import { UpdateLocaliteComponent } from './update-localite/update-localite.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { UpdateCatfourComponent } from './update-catfour/update-catfour.component';

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

      { path:"registre/:id",component:RegistreComponent,
        canActivate: [AplicationGuard]
      },
      {
        path: "user", component: UserListComponent,
        canActivate: [AplicationGuard],
      },
      { path:"user-list",component:UserListComponent,
        canActivate: [AplicationGuard]
       },

       { path:"updateUser/:id",component:UpdateUserComponent,
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

      { path:"catProd",component:CategoryComponent,
        canActivate: [AplicationGuard]
      },
      
      {
        path: "catProdListe", component: CategoryProduitListComponent,
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
      
      { path:"addUser",component:UserComponent,
        canActivate: [AplicationGuard]
      },
      
      { 
        path:"magasin",component:MagasinListComponent,
        canActivate: [AplicationGuard]
      },

      { 
        path:"addMagasin",component:MagasinComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"employe", component:EmployeListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"employeListe", component:EmployeListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addEmploye", component:AddEmployeComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addEmploye/:id", component:AddEmployeComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"produitList", component:ProduitListComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addProduit", component:AddProduitComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"addProduit/:id", component:AddProduitComponent,
        canActivate: [AplicationGuard]
      },
      {
        path:"category", component:CategoryListComponent,
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
