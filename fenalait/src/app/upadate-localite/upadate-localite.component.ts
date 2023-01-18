import { Component, OnInit } from '@angular/core';
import { Localite } from '../models/localite';
import { LocaliteService } from '../services/localite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upadate-localite',
  templateUrl: './upadate-localite.component.html',
  styleUrls: ['./upadate-localite.component.scss']
})
export class UpadateLocaliteComponent implements OnInit {
  
  form: any = {
    id:'',
    nom: '',
    description:''

    
  };

  id?:number; 
  localite: Localite =new Localite();
  constructor(private localiteService: LocaliteService,
    private route: ActivatedRoute, private router:Router){}
    
    ngOnInit():void{
      this.id =this.route.snapshot.params['id'];
      this.localiteService.get(this.id).subscribe(data =>{
        this.form =data;
      }, error =>console.log(error));

    }
    onSubmit(){
      this.localiteService.update(this.id, this.localite).subscribe(data =>{})

    }


}
