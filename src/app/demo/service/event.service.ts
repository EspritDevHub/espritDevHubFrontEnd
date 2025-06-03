import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../module/event';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private baseUrl = 'http://localhost:9091/api/event';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(this.baseUrl+"/getAll");
    }

    getById(id: string): Observable<Event> {
        return this.http.get<Event>(`${this.baseUrl}/get/${id}`);
    }

    create(event: Event): Observable<Event> {
        return this.http.post<Event>(this.baseUrl+"/add", event);
    }

    update(id: string, event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.baseUrl}/update/${id}`, event);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
}
