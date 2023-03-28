import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseURL= "http://localhost:8181/api/v1/produits"

  constructor( private httpClient:HttpClient) { }

  public getAllProduct(params: any): Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(this.baseURL + '/getAll', {params});
  }

  get(productId: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL + '/get'}/${productId}`, httpOptions);
  }

  addProduit(data: any): Observable<any>{
    return this.httpClient.post(this.baseURL + '/add', data, httpOptions);
  }

  update(id: any, data: any): Observable<any>{
    return this.httpClient.put(`${this.baseURL + '/edit'}/${id}`, data, httpOptions);
  }

  public delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.baseURL + '/delete'}/${id}`, httpOptions);
  }
}
