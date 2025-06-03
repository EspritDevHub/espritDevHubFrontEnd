import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";

import {SprintService} from "../../../../service/sprint.service";
import {PhaseService} from "../../../../service/phase.service";
import {Phase} from "../../../../module/phase";
import {Sprint} from "../../../../module/sprint";
import {Event} from "../../../../module/event";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-edit-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule,
        ButtonModule, RippleModule, CheckboxModule, InputTextModule],
    templateUrl: './edit-phase.component.html',
})
export class SprintEditComponent implements OnInit {
    phase: Phase = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        isActive: true
    };

    isEditMode: boolean = false;

    constructor(
        private phaseService: PhaseService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.phaseService.getById(id).subscribe({
                next: (data) => {
                    this.phase = data;
                },
                error: (err) => {
                    console.error('Erreur lors du chargement de la phase', err);
                }
            });
        }
    }

    onSubmit(): void {
        if (this.isEditMode) {
            this.phaseService.update(this.phase.id!, this.phase).subscribe({
                next: () => {
                    console.log('Phase mise à jour avec succès.');
                    this.router.navigate(['/phases']); // ou ton chemin vers la liste
                },
                error: (err) => {
                    console.error('Erreur lors de la mise à jour de la phase', err);
                }
            });
        } else {
            if (this.phase.startDate && this.phase.startDate.length === 10) {
                this.phase.startDate = this.phase.startDate + 'T00:00:00';
            }
            if (this.phase.endDate && this.phase.endDate.length === 10) {
                this.phase.endDate = this.phase.endDate + 'T00:00:00';
            }
            this.phaseService.create(this.phase).subscribe({
                next: () => {
                    console.log('Phase créée avec succès.');
                    this.router.navigate(['/apps/phase/list']);
                },
                error: (err) => {
                    console.error('Erreur lors de la création de la phase', err);
                }
            });
        }
    }

    resetForm(): void {
       this.ngOnInit();
    }
}
