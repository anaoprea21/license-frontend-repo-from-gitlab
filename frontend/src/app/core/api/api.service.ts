import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  get(
    path: string,
    params = {},
    headers = new HttpHeaders()
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { params, headers });
  }

  put(path: string, body = {}, headers = new HttpHeaders()): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body, { headers });
  }

  post(
    path: string,
    body = {},
    params = {},
    headers = new HttpHeaders()
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body, { params, headers });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`);
  }
}
