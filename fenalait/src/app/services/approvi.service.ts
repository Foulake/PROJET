import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Approvi } from '../models/approvi';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})
export class ApproviService {

  private baseURL= "http://localhost:8181/api/v1/approvissionnements"

  constructor( private httpClient:HttpClient) { }
  header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');


  public getAllApprovis(params: any): Observable<Approvi[]>{
    return this.httpClient.get<Approvi[]>(this.baseURL + '/getAll', {params});
  }

  get(approId: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL + '/get'}/${approId}`, httpOptions);
  }

  addApprovi(data: any): Observable<any>{
    return this.httpClient.post(this.baseURL + '/add', data, httpOptions);
  }

  update(id: any, data: any): Observable<any>{
    return this.httpClient.put(`${this.baseURL + '/edit'}/${id}`, data, httpOptions);
  }

  public delete(id: any): Observable<any>{
    return this.httpClient.delete(`${this.baseURL + '/delete'}/${id}`, httpOptions);
  }
}
