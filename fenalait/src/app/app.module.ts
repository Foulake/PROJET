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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ProduitListComponent } from './produit-list/produit-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon';
import{MatDialogModule} from '@angular/material/dialog';
import{MatButtonModule}from '@angular/material/button';
import { AuthComponent } from './auth/auth.component';
import{MatInputModule} from '@angular/material/input';
import { RegistreComponent } from './registre/registre.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import{MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { HttpIntersepterService } from './services/http-intersepter.service';
import { CategorieFournisseurComponent } from './categorie-fournisseur/categorie-fournisseur.component';
import { CategorieFournisseurListComponent } from './categorie-fournisseur-list/categorie-fournisseur-list.component';
import { UpadateLocaliteComponent } from './upadate-localite/upadate-localite.component';
import { UpdateCategorieFourComponent } from './update-categorie-four/update-categorie-four.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';


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
    ProduitListComponent,
    AuthComponent,
    RegistreComponent,
    LoginComponent,
    ProfileComponent,
    AddClientComponent,
    CategorieFournisseurComponent,
    CategorieFournisseurListComponent,
    UpadateLocaliteComponent,
    UpdateCategorieFourComponent,
    UpdateFournisseurComponent,
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,


  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,
      useClass:HttpIntersepterService,
      multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
