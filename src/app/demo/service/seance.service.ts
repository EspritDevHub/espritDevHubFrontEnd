import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seance } from '../module/Seance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

 private baseUrl = 'http://localhost:8080/api/seances'; // à adapter à ton backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.baseUrl);
  }

  getById(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.baseUrl}/${id}`);
  }

  create(Seance: Seance): Observable<any> {
    return this.http.post<any>(this.baseUrl, Seance);
  }

  update(id: any, Seance: Seance): Observable<Seance> {
    return this.http.put<Seance>(`${this.baseUrl}/${id}`, Seance);
  }

delete(id: string) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}
  getSeancesForWeek(start: string, end: string): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.baseUrl}/week?start=${start}&end=${end}`);
  }
  }

