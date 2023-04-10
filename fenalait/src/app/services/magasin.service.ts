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
   private baseUrl ="http://localhost:8181/api/v1/magasins";
  constructor(private http: HttpClient) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');
  
  public getAll(): Observable<Magasin[]>{
    return this.http.get<Magasin[]>(this.baseUrl + '/getAll', httpOptions);
  }

  getAllMagasin(params:any): Observable<Magasin[]> {
      return this.http.get<Magasin[]>(this.baseUrl + '/getAll',{ params });
  }

  get(id: any): Observable<Magasin[]> {
    return this.http.get<Magasin[]>(`${this.baseUrl + '/get'}/${id}`, httpOptions);
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

  findMagasin(nom: any): Observable<Magasin[]>{
    return this.http.get<Magasin[]>(`${this.baseUrl + '/search'}?nom=${nom}`, httpOptions);
  }
}
