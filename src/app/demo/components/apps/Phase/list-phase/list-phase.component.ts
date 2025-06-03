import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterLink} from "@angular/router";
import {PhaseService} from "../../../../service/phase.service";
import {Phase} from "../../../../module/phase";

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
  templateUrl: './list-phase.component.html',
})
export class PhaseListComponent implements OnInit {
    phases: Phase[] = [];

    constructor(private phaseService: PhaseService) {}

    ngOnInit(): void {
        this.phaseService.getAll().subscribe({
            next: data => this.phases = data,
            error: err => console.error('Erreur chargement phases', err)
        });
    }

    deletePhase(id: string) {
        this.phaseService.delete(id).subscribe({
            next: () => {
                this.phases = this.phases.filter(p => p.id !== id);
            },
            error: err => console.error('Erreur suppression', err)
        });
    }
}
