import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';

 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};


@Injectable({
  providedIn: 'root'
})

export class ClientService {

  baseUrl = 'http://localhost:8181/api/v1/clients';
  constructor(private http: HttpClient) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');

  getAllClient(params: any): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/getAll', {params});
}
getAllSmall(): Observable<Client[]>{
  return this.http.get<Client[]>(this.baseUrl + '/getAll', httpOptions);
}


  get(id: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl + '/get'}/${id}`, httpOptions);
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

  findClient(prenomClient: any): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.baseUrl + '/search/full'}?prenomClient=${prenomClient}`, httpOptions);
  }
}
