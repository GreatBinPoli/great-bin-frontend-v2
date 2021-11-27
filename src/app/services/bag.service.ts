import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bag } from '../model/bag';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private apiUrl = 'http://localhost:8080/api/v1/users';
  constructor(private http: HttpClient) {}

  create(data: any, id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/bag`, data);
  }
  getAll(id: number): Observable<Bag[]> {
    return this.http.get<Bag[]>(`${this.apiUrl}/${id}/bags`);
  }
}
