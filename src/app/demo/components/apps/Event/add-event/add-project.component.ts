import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Router} from "@angular/router";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Event} from "../../../../module/event";
import {EventService} from "../../../../service/event.service";
import {InputTextModule} from "primeng/inputtext";



@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule, ButtonModule, RippleModule, InputTextModule],
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent {
    event: any = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        eventType: '',
        location: '',
        organizer: '',
        isActive: true,
        projectId: ''
    };

    eventTypes: string[] = ['MEETING', 'WORKSHOP', 'SEMINAR'];

    constructor(private eventService: EventService, private router: Router) {}

    addEvent(): void {

        this.eventService.create(this.event).subscribe({
            next: (res) => {
                console.log('Event ajouté avec succès', res);
                this.router.navigate(['/apps/event/list']);
            },
            error: (err) => {
                console.error('Erreur lors de l’ajout du projet', err);
            },
        });
    }

    resetForm(form: any): void {
        form.resetForm();
        this.event = {
            titre: '',
            description: '',
            lieu: '',
            dateDebut: new Date().toISOString().split('T')[0],
            dateFin: new Date().toISOString().split('T')[0],
            tag: '',
            note: 0,
            projet: 0,
            user: 0
        };
    }


}
