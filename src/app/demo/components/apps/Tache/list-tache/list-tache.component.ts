import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { Tache } from 'src/app/demo/api/tache';
import { RouterLink } from "@angular/router";
import {TacheService} from "../../../../service/tache.sevice";

@Component({
    selector: 'app-list-tache',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        TableModule,
        DropdownModule,
        ButtonModule,
        FormsModule,
        RouterLink,
    ],
    templateUrl: './list-tache.component.html',
})
export class ListTacheComponent implements OnInit {
    private tacheService = inject(TacheService);

    taches: Tache[] = [];
    stats: { [key: string]: number } = {};

    ngOnInit(): void {
        this.tacheService.getAllTaches().subscribe({
            next: (data) => (this.taches = data),
            error: (err) => console.error('Erreur de chargement des tâches:', err),
        });
        this.tacheService.getTacheStatistiques().subscribe({
            next: (data) => {
                this.stats = data
                console.log(this.stats)
            },

            error: (err) => console.error('Erreur de chargement des statistiques:', err),
        });
    }

    deleteTache(id: string): void {
        if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
            this.tacheService.deleteTache(id).subscribe({
                next: () => {
                    // Supprimer la tâche localement sans recharger la page
                    this.taches = this.taches.filter(t => t.id !== id);
                    console.log('Tâche supprimée avec succès');
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression de la tâche:', err);
                    alert('Échec de la suppression de la tâche.');
                }
            });
        }
    }
}
