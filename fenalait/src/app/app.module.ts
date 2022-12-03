import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ProduitComponent } from './produit/produit.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { LocaliteComponent } from './localite/localite.component';
import { LocaliteListComponent } from './localite-list/localite-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { EmployeComponent } from './employe/employe.component';
import { EmployeListComponent } from './employe-list/employe-list.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ApprovissionnementComponent } from './approvissionnement/approvissionnement.component';
import { ApprovissionnementListComponent } from './approvissionnement-list/approvissionnement-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ProduitListComponent } from './produit-list/produit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ClientComponent,
    FournisseurComponent,
    ProduitComponent,
    ClientListComponent,
    FournisseurListComponent,
    LocaliteComponent,
    LocaliteListComponent,
    MagasinComponent,
    MagasinListComponent,
    EmployeComponent,
    EmployeListComponent,
    CategoryComponent,
    CategoryListComponent,
    ApprovissionnementComponent,
    ApprovissionnementListComponent,
    AddcategorieComponent,
    MenuComponent,
    ProduitListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
