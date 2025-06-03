import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../module/event";

@Component({
    selector: 'app-edit-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule,
        ButtonModule, RippleModule, CheckboxModule, InputTextModule],
    templateUrl: './edit-project.component.html',
})
export class EditEventComponent implements OnInit {
    event!: Event & { startDateString?: string; endDateString?: string };
    eventTypes = ['CONFERENCE', 'ATELIER', 'WORKSHOP', 'WEBINAIRE']; // ou ce que ton enum EventType contient côté backend

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.eventService.getById(eventId).subscribe({
                next: (data) => {
                    this.event = data;
                    // Convertir LocalDateTime en string ISO pour input datetime-local
                    this.event.startDateString = this.toInputDateTimeString(this.event.startDate);
                    this.event.endDateString = this.event.endDate ? this.toInputDateTimeString(this.event.endDate) : '';
                },
                error: (err) => console.error('Erreur lors du chargement de l’événement:', err),
            });
        }
    }

    updateEvent(): void {
        if (!this.event) return;

        this.event.startDate = new Date(this.event.startDate!).toISOString();
        this.event.endDate = new Date(this.event.endDate!).toISOString();

        this.eventService.update(this.event.id!, this.event).subscribe({
            next: () => {
                alert('Événement mis à jour avec succès');
                this.router.navigate(['/events']);
            },
            error: (err) => {
                console.error('Erreur lors de la mise à jour:', err);
                alert('Erreur lors de la mise à jour de l’événement.');
            }
        });
    }

    resetForm(form: any): void {
        form.resetForm();
        if (this.event) {
            this.event.startDateString = this.toInputDateTimeString(this.event.startDate);
            this.event.endDateString = this.event.endDate ? this.toInputDateTimeString(this.event.endDate) : '';
        }
    }

    private toInputDateTimeString(date?: string | Date): string {
        if (!date) return '';
        const d = new Date(date);
        const iso = d.toISOString();
        return iso.substring(0, 16);
    }
}
