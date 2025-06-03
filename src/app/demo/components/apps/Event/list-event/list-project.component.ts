import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../module/event";

@Component({
  selector: 'app-list-project',
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
  templateUrl: './list-project.component.html',
})
export class ListEventComponent implements OnInit {
    private eventService = inject(EventService);

    events: Event[] = [];

    ngOnInit(): void {
        this.eventService.getAll().subscribe({
            next: (data) => (this.events = data),
            error: (err) => console.error('Erreur de chargement des événements:', err),
        });
    }

    deleteEvent(id: string): void {
        if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
            this.eventService.delete(id).subscribe({
                next: () => {
                    this.events = this.events.filter(event => event.id !== id);
                    console.log('Événement supprimé avec succès');
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression de l\'événement:', err);
                    alert('Échec de la suppression de l\'événement.');
                }
            });
        }
    }
}
