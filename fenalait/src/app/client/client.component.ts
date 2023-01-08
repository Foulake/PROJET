import { Component, OnInit } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  content!: string;

  constructor(private clientListe: ClientListComponent) { }

  ngOnInit(): void {
    
    /** this.clientListe.getClients().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err: any) => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error avec status: " + err.status;
        }
      }
    });*/
  }

}
