import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterceptor } from '../auth-interceptor';
import { Client } from '../models/client';


const baseUrl = 'http://localhost:8181/api/v1/clients';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  
  constructor(private http: HttpClient, intersecptor: AuthInterceptor) { }

  
   header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-origin', '*');

  getAllClient(): Observable<Client[]> {
      return this.http.get<Client[]>(baseUrl + '/getAll', {'headers': this.header});
  }

  get(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl + '/get'}/${id}`);
  }

  create(data: any): Observable<any>{
    return this.http.post(baseUrl + '/add', data)
  }

  update(id: any, data : any): Observable<any>{
    return this.http.put(`${baseUrl + '/edit'}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl + '/delete'}/${id}`);
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findClient(data: any): Observable<Client[]>{
    return this.http.get<Client[]>(`${baseUrl + '/search'}?data=${data}`);
  }
}
