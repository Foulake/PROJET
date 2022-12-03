import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovissionnementListComponent } from './approvissionnement-list/approvissionnement-list.component';
import { ApprovissionnementComponent } from './approvissionnement/approvissionnement.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client/client.component';
import { EmployeListComponent } from './employe-list/employe-list.component';
import { EmployeComponent } from './employe/employe.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { LocaliteListComponent } from './localite-list/localite-list.component';
import { LocaliteComponent } from './localite/localite.component';
import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MenuComponent } from './menu/menu.component';
import { ProduitComponent } from './produit/produit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"client",component:ClientListComponent},
  {path:"addClient",component:ClientComponent},
  {path:"dasbord",component:MenuComponent},
  {path:"localie",component:LocaliteListComponent},
  {path:"addLocalite",component:LocaliteComponent},
  {path:"fournisseur",component:FournisseurListComponent},
   { path:"addFournisseur",component:FournisseurComponent},
   {path:"addProduit",component:ProduitComponent},
   {path:"addUser",component:UserComponent},
   {path:"magasin",component:MagasinListComponent},
   {path:"addMagasin",component:MagasinComponent},
   {path:"employe",component:EmployeListComponent},
   {path:"addEmploye",component:EmployeComponent},
   {path:"category",component:CategoryListComponent},
   {path:"addCategory",component:CategoryComponent},
   {path:"appro",component:ApprovissionnementListComponent},
   {path:"addAppro",component:ApprovissionnementComponent}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
