import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SMSService {
  private apiUrl = 'http://localhost:8080/api/v1/users/sms';
  constructor(private http: HttpClient) {}

  EnviarSMS(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
