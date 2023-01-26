import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ClientListComponent } from '../client-list/client-list.component';

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
