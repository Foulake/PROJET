import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthLoginInfo } from '../login-info';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

 export class LoginComponent implements OnInit {
  form:any = {};
  isLoggedIn =false;
  isLoginFailed =false;
  errorMessage ='';
  roles:string[]=[];
  private loginInfo:AuthLoginInfo | undefined;
  
  constructor(private authService :AuthService, private tokenStorage:TokenStorageService){}
  formgroup:FormGroup | undefined;
  ngOnInit() {
  
  }
  onSubmit(){
    console.log(this.form);
    this.loginInfo = new AuthLoginInfo(
      this.form.email,
      this.form.password);
      this.authService.login(this.loginInfo).subscribe(
              data =>{
          this.tokenStorage.saveToken(data.tokenRefresh);
          this.tokenStorage.saveEmail(data.email);
          //this.tokenStorage.saveEmail(data.email);
         // this.tokenStorage.saveAuthorities(data.refreshToken);
          this.isLoginFailed =false;
          this.isLoggedIn =true;
          // this.roles= this.tokenStorage.getAuthorities();
          this.reloadPage();
        },
        (        error: any)=>{
          console.log(error);
          this.errorMessage
          this.isLoginFailed =true;
        }
      );
  }
  reloadPage(){
    window.location.reload();
  }
 
 
}
