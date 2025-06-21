
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private apiUrl = 'http://192.168.79.129:9097/api/criteres/sprints'; // URL for sprint data

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Fetch sprints data from the backend
  }
}
