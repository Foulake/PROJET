import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  baseUrl = 'http://localhost:8181/api/v1/fournisseurs';
  constructor(private http: HttpClient) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');

  getAllFournisseur(params:any): Observable<Fournisseur[]> {
      return this.http.get<Fournisseur[]>(this.baseUrl + '/getAll', {params});
  }

  get(id: any): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl + '/get'}/${id}`, httpOptions);
  }

  addFournisseur(data: any): Observable<any>{
    return this.http.post(this.baseUrl + '/add', data, httpOptions)
  }

  update(id: any, data : any): Observable<any>{
    return this.http.put(`${this.baseUrl + '/edit'}/${id}`, data, httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl + '/delete'}/${id}`, httpOptions);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findFournisseur(nom: any): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(`${this.baseUrl + '/search'}?nom=${nom}`, httpOptions);
  }
}
