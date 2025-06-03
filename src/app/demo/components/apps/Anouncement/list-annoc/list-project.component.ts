import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {AnnocService} from "../../../../service/annoc.service";
import {Annoc} from "../../../../module/annoc";

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
export class ListAnnocComponent implements OnInit {

    annocs: Annoc[] = [];
    constructor(private annocService: AnnocService) {}
    ngOnInit(): void {
        this.annocService.getAll().subscribe({
            next: (data) => (this.annocs = data),
            error: (err) => console.error('Erreur de chargement des événements:', err),
        });
    }

    deleteAnnoc(id: string): void {
        if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
            this.annocService.delete(id).subscribe({
                next: () => {
                    this.annocs = this.annocs.filter(annoc => annoc.id !== id);
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
