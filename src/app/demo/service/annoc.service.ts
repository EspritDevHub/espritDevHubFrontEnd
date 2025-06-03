import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../module/event';
import {Annoc} from "../module/annoc";

@Injectable({
    providedIn: 'root'
})
export class AnnocService {

    private baseUrl = 'http://localhost:9091/api/announcements';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Annoc[]> {
        return this.http.get<Annoc[]>(this.baseUrl+"/all");
    }

    getById(id: string): Observable<Annoc> {
        return this.http.get<Annoc>(`${this.baseUrl}/${id}`);
    }

    create(event: Annoc): Observable<Annoc> {
        return this.http.post<Annoc>(this.baseUrl+"/add", event);
    }

    update(id: string | null, annoc: Annoc): Observable<Annoc> {
        return this.http.put<Annoc>(`${this.baseUrl}/update/${id}`, annoc);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
