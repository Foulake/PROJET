import { Component, OnInit } from '@angular/core';
import { Localite } from '../localite';
@Component({
  selector: 'app-localite-list',
  templateUrl: './localite-list.component.html',
  styleUrls: ['./localite-list.component.scss']
})
export class LocaliteListComponent implements OnInit {
 localites!:Localite[];
  constructor() { }

  ngOnInit(): void {
  }

}
