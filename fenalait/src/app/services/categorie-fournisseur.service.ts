import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieFournisseur } from '../models/categorie-fournisseur';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})
export class CategorieFournisseurService {

  baseUrl = 'http://localhost:8181/api/v1/categorieFournisseurs';
  constructor(private http: HttpClient) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');

  getAllCategorieFournisseur(params:any): Observable<CategorieFournisseur[]> {
      return this.http.get<CategorieFournisseur[]>(this.baseUrl + '/getAll', {params});
  }

  get(id: any): Observable<CategorieFournisseur[]> {
    return this.http.get<CategorieFournisseur[]>(`${this.baseUrl + '/get'}/${id}`, httpOptions);
  }

  create(data: any): Observable<any>{
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

  findCategorieFournisseur(description: any): Observable<CategorieFournisseur[]>{
    return this.http.get<CategorieFournisseur[]>(`${this.baseUrl + '/search'}?description=${description}`, httpOptions);
  }
}

