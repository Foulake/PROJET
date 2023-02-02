import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-origin': '*'})

};

@Injectable({
  providedIn: 'root'
})
export class CategoryProduitService {

  baseUrl = 'http://localhost:8181/api/v1/categories';

  constructor(private http:HttpClient) { }

  getAll(params: any): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl + '/getAll', {params});
  }

  getAllSmall(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl + '/getAll', httpOptions);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(`${this.baseUrl + '/delete'}/${id}`, httpOptions);
  }

}
