import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthInterceptor } from '../auth-interceptor';
import { AuthService } from '../auth.service';
import { AuthLoginInfo } from '../login-info';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';


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


  
  
  constructor(private authService :AuthService, private tokenStorage:TokenStorageService,private router:Router){}
  formgroup:FormGroup | undefined;
  ngOnInit() {
  
  }
  onSubmit(){
    console.log(this.form);
    this.loginInfo = new AuthLoginInfo(
      this.form.email,
      this.form.password);
      this.authService.login(this.loginInfo).subscribe(
              res=>{
              AuthInterceptor.accessToken=res.token;

          this.tokenStorage.saveToken(res.tokenAccess);
          //this.tokenStorage.saveEmail(data.email);
          //this.tokenStorage.saveEmail(data.email);
         // this.tokenStorage.saveAuthorities(data.refreshToken);
           this.isLoginFailed =false;
           this.isLoggedIn =true;
           this.router.navigate(['/dasbord'])
 

           //this.route.navigateByUrl('/dasbord')
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
