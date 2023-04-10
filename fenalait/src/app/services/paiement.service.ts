import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private baseURL="http://localhost:8181/api/v1/paiements"

  constructor(private httpClient :HttpClient) { }

  get(id: any): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(`${this.baseURL + '/get'}/${id}`, httpOptions);
  }

  getAllEmploye(params: any): Observable<Paiement[]> {
    return this.httpClient.get<Paiement[]>(this.baseURL + '/getAll', { params })
  }

  addEmploye(data: any): Observable<any>{
    return this.httpClient.post(this.baseURL + '/add', data, httpOptions);
  }

  update(id: any, data: any): Observable<any>{
    return this.httpClient.put(`${this.baseURL + '/edit'}/${id}`, data, httpOptions)
  }

  delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.baseURL + '/delete'}/${id}`, httpOptions)
  }
}
