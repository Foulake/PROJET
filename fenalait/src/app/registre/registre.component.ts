import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
   form!: FormGroup;
  constructor(
    private  formBuilder:FormBuilder,
    private http: HttpClient,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form =this.formBuilder.group({
      nom: '',
      prenom:'',
      email:'',
      password:''

    });
  }
  submit(){
    this.http.post('http://localhost:8181/auth/sign', this.form.getRawValue()).subscribe()
  }

}
