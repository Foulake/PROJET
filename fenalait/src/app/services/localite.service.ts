import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localite } from '../models/localite';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})
export class LocaliteService {
    baseUrl = 'http://localhost:8181/api/v1/localites';
  constructor(private http: HttpClient) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');

  public getAll(): Observable<Localite[]>{
    return this.http.get<Localite[]>(this.baseUrl + '/getAll', httpOptions);
  }
  getAllLocalite(params:any): Observable<Localite[]> {
      return this.http.get<Localite[]>(this.baseUrl + '/getAll',{ params });
  }

  get(id: any): Observable<Localite[]> {
    return this.http.get<Localite[]>(`${this.baseUrl + '/get'}/${id}`, httpOptions);
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

  findLocalite(nom: any): Observable<Localite[]>{
    return this.http.get<Localite[]>(`${this.baseUrl + '/search'}?nom=${nom}`, httpOptions);
  }
}
