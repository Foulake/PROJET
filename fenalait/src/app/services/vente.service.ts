import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Vente } from '../models/vente';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})
export class VenteService {
  private baseURL= "http://localhost:8181/api/v1/ventes"

  constructor( private httpClient:HttpClient) { }

  public getAllVent(params: any): Observable<Vente[]>{
    return this.httpClient.get<Vente[]>(this.baseURL + '/getAll', {params});
  }

  get(productId: any): Observable<Vente> {
    return this.httpClient.get(`${this.baseURL + '/get'}/${productId}`, httpOptions);
  }

  addVente(data: any): Observable<any>{
    return this.httpClient.post(this.baseURL + '/add', data, httpOptions);
  }

  update(id: any, data: any): Observable<any>{
    return this.httpClient.put(`${this.baseURL + '/edit'}/${id}`, data, httpOptions);
  }

  public delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.baseURL + '/delete'}/${id}`, httpOptions);
  }
}



