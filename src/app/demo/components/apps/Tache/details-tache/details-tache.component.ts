import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';

import { Tache } from '../../../../api/tache';
import {TacheService} from "../../../../service/tache.sevice";

@Component({
    selector: 'app-details-tache',
    standalone: true,
    templateUrl: './details-tache.component.html',
    imports: [CommonModule, DatePipe, RouterLink]
})
export class DetailsTacheComponent {
    tacheId!: string;
    tache!: Tache;

    constructor(
        private route: ActivatedRoute,
        private tacheService: TacheService
    ) {}

    ngOnInit(): void {
        this.tacheId = this.route.snapshot.paramMap.get('id')!;
        this.getTacheDetails();
    }

    getTacheDetails(): void {
        this.tacheService.getTacheById(this.tacheId).subscribe({
            next: (data: Tache) => {
                console.log('Tâche récupérée :', data);
                this.tache = data;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération de la tâche', err);
            },
        });
    }
}
