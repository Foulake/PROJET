import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { LocaliteComponent } from './localite/localite.component';
import { LocaliteListComponent } from './localite-list/localite-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { EmployeComponent } from './components/employe/employe.component';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ApprovissionnementComponent } from './approvissionnement/approvissionnement.component';
import { ApprovissionnementListComponent } from './approvissionnement-list/approvissionnement-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
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
import { ChangerMotDePasseComponent } from './components/changer-mot-de-passe/changer-mot-de-passe/changer-mot-de-passe.component';
import { ChangerProfileComponent } from './components/changer-profile/changer-profile/changer-profile.component';
import { AddEmployeComponent } from './components/add-employe/add-employe.component';
import { ClientComponent } from './components/client/client.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { CategoryProduitListComponent } from './components/category-produit-list/category-produit-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ClientComponent,
    FournisseurComponent,
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
    AddProduitComponent,
    ProduitComponent,
    ProduitListComponent,
    AuthComponent,
    RegistreComponent,
    LoginComponent,
    ProfileComponent,
    AddClientComponent,
    CategorieFournisseurComponent,
    CategorieFournisseurListComponent,
    ChangerMotDePasseComponent,
    ChangerProfileComponent,
    AddEmployeComponent,
    UserListComponent,
    UpdateUserComponent,
    AddProduitComponent,
    CategoryProduitListComponent,
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
    NgxPaginationModule,
    ToastrModule.forRoot()

  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,
      useClass:HttpIntersepterService,
      multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
