import { Injectable } from '@angular/core';
import{HttpClient} from  '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getClientList() {
    throw new Error('Method not implemented.');
  }
  private  baseURL ="http://localhost:9191/api/v1/clients"

  constructor(private httpClient: HttpClient) { }
}
