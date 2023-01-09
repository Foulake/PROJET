import { Component, OnInit } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
