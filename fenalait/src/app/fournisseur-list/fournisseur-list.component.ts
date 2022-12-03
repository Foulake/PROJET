import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../fournisseur';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs!:Fournisseur[];
  constructor() { }

  ngOnInit(): void {
  }

}
