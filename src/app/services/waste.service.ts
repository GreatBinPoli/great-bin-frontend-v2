import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waste } from '../model/waste';

@Injectable({
  providedIn: 'root',
})
export class WasteService {
  private apiUrl = 'http://localhost:8080/api/v1/users';
  constructor(private http: HttpClient) {}

  create(data: any, id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/bag`, data);
  }
  getAll(documento: number, idbag: number): Observable<Waste[]> {
    return this.http.get<Waste[]>(
      `${this.apiUrl}/${documento}/bag/${idbag}/wastes`
    );
  }
}
