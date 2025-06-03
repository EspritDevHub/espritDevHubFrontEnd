import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {EventService} from "../../../../service/event.service";
import {Event} from "../../../../module/event";
import {AnnocService} from "../../../../service/annoc.service";
import {Annoc} from "../../../../module/annoc";

@Component({
    selector: 'app-details-project',
    standalone: true,

    templateUrl: './details-project.component.html',

    imports: [
        DatePipe,
        CommonModule
    ]
})
export class EventDetailsComponent implements OnInit {
    annocId!: string;
    annoc!: Annoc;

    constructor(
        private route: ActivatedRoute,
        private eventService: AnnocService
    ) {}

    ngOnInit(): void {
        this.annocId = this.route.snapshot.paramMap.get('id')!;
        this.getEventDetails();
    }

    getEventDetails(): void {
        this.eventService.getById(this.annocId).subscribe({
            next: (data) => (this.annoc = data),
            error: (err) => {
                console.error('Erreur lors de la récupération de l’événement', err);
            }
        });
    }
}
