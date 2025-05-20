import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ProjetService } from 'src/app/demo/service/projet.sevice';
import { Projet } from 'src/app/demo/api/projet';
import {RouterLink} from "@angular/router";

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
export class ListProjectComponent implements OnInit {
    private projetService = inject(ProjetService);

    projects: Projet[] = [];

    ngOnInit(): void {
        this.projetService.getAllProjets().subscribe({
            next: (data) => (this.projects = data),
            error: (err) => console.error('Erreur de chargement des projets:', err),
        });
    }

    deleteProject(id: string): void {
        if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
            this.projetService.deleteProjet(id).subscribe({
                next: () => {
                    // Supprimer le projet localement sans recharger la page
                    this.projects = this.projects.filter(project => project.id !== id);
                    console.log('Projet supprimé avec succès');
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression du projet:', err);
                    alert('Échec de la suppression du projet.');
                }
            });
        }
    }
}
