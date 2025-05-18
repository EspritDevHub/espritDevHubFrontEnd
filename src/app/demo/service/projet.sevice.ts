import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Projet } from 'src/app/demo/api/projet';

@Injectable({
    providedIn: 'root'
})
export class ProjetService {

    private apiUrl = 'http://localhost:8086/api/projets';

    constructor(private http: HttpClient) {}

    getAllProjets(): Observable<Projet[]> {
        return this.http.get<Projet[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    getProjetById(id: string): Observable<Projet> {
        return this.http.get<Projet>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    addProjet(projet: Projet): Observable<Projet> {
        return this.http.post<Projet>(this.apiUrl, projet).pipe(
            catchError(this.handleError)
        );
    }

    updateProjet(id: string, projet: Projet): Observable<Projet> {
        return this.http.put<Projet>(`${this.apiUrl}/${id}`, projet).pipe(
            catchError(this.handleError)
        );
    }

    deleteProjet(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur client : ${error.error.message}`;
        } else {
            // Erreur côté serveur
            errorMessage = `Erreur serveur : Code ${error.status}, Message : ${error.message}`;
        }
        console.error(errorMessage);  // Vous pouvez également loguer l'erreur dans un service de log
        return throwError(errorMessage);  // Renvoyer l'erreur sous forme d'observable
    }
}
