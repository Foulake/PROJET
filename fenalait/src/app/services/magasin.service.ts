import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Magasin } from '../models/magasin';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
   private baseURL ="http://localhost:8181/api/v1/magasins"

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Magasin[]>{
    return this.httpClient.get<Magasin[]>(this.baseURL + '/getAll', httpOptions);
  }
}
