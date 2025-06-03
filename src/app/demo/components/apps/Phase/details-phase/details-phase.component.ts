import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {PhaseService} from "../../../../service/phase.service";
import {Phase} from "../../../../module/phase";
interface DashboardSummary {
    activePhases: number;
    ongoingSprints: number;
    upcomingEvents: number;
    activeAnnouncements: number;
}
@Component({
    selector: 'app-details-project',
    standalone: true,

    templateUrl: './details-phase.component.html',

    imports: [
        DatePipe,
        CommonModule
    ]
})
export class PhaseDetailsComponent implements OnInit {
    phase!: Phase | null;
    phaseId!: string | null;
    progress?: number;
    dashboardSummary: { [key: string]: number } = {};

    constructor(
        private route: ActivatedRoute,
        private phaseService: PhaseService
    ) {
    }

    ngOnInit(): void {
        this.phaseId = this.route.snapshot.paramMap.get('id');
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.phaseService.getById(id).subscribe({
                next: data => this.phase = data,
                error: () => this.phase = null
            });
        } else {
            this.phase = null;
        }
        this.loadDashboardSummary();
        this.loadProgress();

    }

    loadProgress() {
        this.phaseService.getPhaseProgress(this.route.snapshot.paramMap.get('id')).subscribe({
            next: (value) => this.progress = value,
            error: (err) => console.error('Erreur lors du chargement de la progression', err)
        });
    }
    loadDashboardSummary() {
        this.phaseService.getDashboardSummary().subscribe({
            next: summary => {
                this.dashboardSummary = summary;
            },
            error: err => console.error('Erreur chargement dashboard summary', err)
        });
    }
}
