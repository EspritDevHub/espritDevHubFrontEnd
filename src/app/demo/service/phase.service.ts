import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Sprint} from "../module/sprint";
import {Phase} from "../module/phase";

@Injectable({
    providedIn: 'root'
})
export class PhaseService {

    private baseUrl = 'http://localhost:9091/api/phases';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Phase[]> {
        return this.http.get<Phase[]>(this.baseUrl);
    }

    getById(id: string): Observable<Phase> {
        return this.http.get<Phase>(`${this.baseUrl}/${id}`);
    }

    create(event: Phase): Observable<Phase> {
        return this.http.post<Phase>(this.baseUrl, event);
    }

    update(id: string, event: Phase): Observable<Phase> {
        return this.http.put<Phase>(`${this.baseUrl}/${id}`, event);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
