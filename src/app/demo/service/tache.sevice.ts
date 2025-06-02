import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tache } from 'src/app/demo/api/tache';

@Injectable({
    providedIn: 'root'
})
export class TacheService {

    private apiUrl = 'http://localhost:8086/api/taches';

    constructor(private http: HttpClient) {}

    // Récupérer toutes les tâches par projet
   getTachesByProjet(projetId: string): Observable<Tache[]> {
        return this.http.get<Tache[]>(`${this.apiUrl}/projet/${projetId}`).pipe(
            catchError(this.handleError)
        );
    }
    notifierChangement(ancienne: Tache, nouvelle: Tache): Observable<string> {
        return this.http.post(`${this.apiUrl}/notifier-changement`, { ancienne, nouvelle }, { responseType: 'text' });
    }
    getAllTaches(): Observable<Tache[]> {
        return this.http.get<Tache[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }


    // Récupérer une tâche par ID
    getTacheById(id: string): Observable<Tache> {
        return this.http.get<Tache>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Ajouter une nouvelle tâche
    addTache(tache: Tache): Observable<Tache> {
        return this.http.post<Tache>(this.apiUrl, tache).pipe(
            catchError(this.handleError)
        );
    }

    // Mettre à jour une tâche existante
    updateTache(id: string, tache: Tache): Observable<Tache> {
        return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache).pipe(
            catchError(this.handleError)
        );
    }

    // Supprimer une tâche par ID
    deleteTache(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Fonction de gestion des erreurs
    private handleError(error: any): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Erreur client : ${error.error.message}`;
        } else {
            // Erreur côté serveur
            errorMessage = `Erreur serveur : Code ${error.status}, Message : ${error.message}`;
        }
        console.error(errorMessage);  // Vous pouvez loguer l'erreur dans un service de log
        return throwError(errorMessage);  // Renvoyer l'erreur sous forme d'observable
    }
}
