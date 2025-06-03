import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Sprint} from "../module/sprint";

@Injectable({
    providedIn: 'root'
})
export class SprintService {

    private baseUrl = 'http://localhost:9091/api/sprints';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Sprint[]> {
        return this.http.get<Sprint[]>(this.baseUrl);
    }

    getById(id: string): Observable<Sprint> {
        return this.http.get<Sprint>(`${this.baseUrl}/${id}`);
    }

    create(event: Sprint): Observable<Sprint> {
        return this.http.post<Sprint>(this.baseUrl, event);
    }

    update(id: string, event: Sprint): Observable<Sprint> {
        return this.http.put<Sprint>(`${this.baseUrl}/${id}`, event);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
