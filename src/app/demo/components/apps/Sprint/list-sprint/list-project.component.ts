import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {AnnocService} from "../../../../service/annoc.service";
import {Annoc} from "../../../../module/annoc";
import {Sprint} from "../../../../module/sprint";
import {SprintService} from "../../../../service/sprint.service";
import {MessageService} from "primeng/api";

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
export class SprintListComponent implements OnInit {
    sprints: Sprint[] = [];

    constructor(
        private sprintService: SprintService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadSprints();
    }

    loadSprints(): void {
        this.sprintService.getAll().subscribe({
            next: (data: Sprint[]) => {
                this.sprints = data;
            },
            error: (err) => {
                console.error('Erreur lors du chargement des sprints :', err);
            }
        });
    }

    deleteSprint(id: string): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce sprint ?')) {
            this.sprintService.delete(id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Sprint supprimé avec succès'
                    });
                    this.loadSprints();
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression du sprint :', err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Impossible de supprimer le sprint'
                    });
                }
            });
        }
    }
}
