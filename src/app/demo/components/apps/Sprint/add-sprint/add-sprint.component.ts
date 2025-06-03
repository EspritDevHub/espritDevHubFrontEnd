import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {Sprint} from "../../../../module/sprint";
import {SprintService} from "../../../../service/sprint.service";
import {Phase} from "../../../../module/phase";
import {PhaseService} from "../../../../service/phase.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule, ButtonModule, RippleModule, InputTextModule],
    templateUrl: './add-sprint.component.html',
})
export class SprintFormComponent implements OnInit {
    sprint: Sprint = {
        title: '',
        phaseId: '',
        startDate: '',
        endDate: '',
        status: '',
        active: true
    };

    phases: Phase[] = [];

    constructor(
        private sprintService: SprintService,
        private phaseService: PhaseService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.phaseService.getAll().subscribe(phases => {
            this.phases = phases;
        });
    }
    formatDateToLocalDateTime(dateStr: string): string {
        return dateStr + 'T00:00:00';
    }
    onSubmit(): void {
        this.sprint.startDate = this.formatDateToLocalDateTime(this.sprint.startDate);
        this.sprint.endDate = this.formatDateToLocalDateTime(this.sprint.endDate);
        if (this.sprint.id) {
            this.sprintService.update(this.sprint.id,this.sprint).subscribe(() => {
                // handle success, navigate or message
            });
        } else {
            this.sprintService.create(this.sprint).subscribe({
                next: (res) => {
                    console.log('Sprint saved', res);
                    this.router.navigate(['/apps/sprint/list']);
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }

    resetForm(): void {
        this.sprint = {
            title: '',
            phaseId: '',
            startDate: '',
            endDate: '',
            status: '',
            active: true
        };
    }
}
