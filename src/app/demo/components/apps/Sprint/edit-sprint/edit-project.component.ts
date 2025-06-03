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
    templateUrl: './edit-project.component.html',
})
export class SprintEditComponent implements OnInit {
    sprint!: Sprint & { startDateString?: string; endDateString?: string };

    phases: Phase[] = [];
    startDateStr: string = '';
    endDateStr: string = '';
    constructor(private sprintService: SprintService, private phaseService: PhaseService,
                private route: ActivatedRoute,
                private router: Router
    ) {}

    ngOnInit() {
        // Charger la liste des phases
        this.phaseService.getAll().subscribe(phases => this.phases = phases);

        const sprintId = this.route.snapshot.paramMap.get('id');
        this.sprintService.getById(sprintId!).subscribe(sprint => {
            this.sprint = sprint;

            // Convertir LocalDateTime en date string "YYYY-MM-DD" pour les inputs date
            this.startDateStr = sprint.startDate ? sprint.startDate.substring(0, 10) : '';
            this.endDateStr = sprint.endDate ? sprint.endDate.substring(0, 10) : '';
        });
    }

    updateSprint() {
        if (!this.sprint) return;

        this.sprint.startDate = this.startDateStr ? this.startDateStr + 'T00:00:00' : 'null';
        this.sprint.endDate = this.endDateStr ? this.endDateStr + 'T00:00:00' : 'null';

        this.sprintService.update(this.sprint.id!,this.sprint).subscribe({
            next: updated => {
                console.log('Sprint mis à jour', updated);
                this.router.navigate(['/apps/sprint/list']);
            },
            error: err => console.error(err)
        });
    }

    resetForm() {
        this.ngOnInit(); // recharge les données d'origine

    }
}
