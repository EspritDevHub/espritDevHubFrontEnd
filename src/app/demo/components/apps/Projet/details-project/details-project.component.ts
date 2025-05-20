import { Component } from '@angular/core';
import {Projet} from "../../../../api/projet";
import {ActivatedRoute} from "@angular/router";
import { ProjetService } from '../../../../service/projet.sevice';
import {DatePipe} from "@angular/common";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details-project',
    standalone: true,

    templateUrl: './details-project.component.html',

    imports: [
        DatePipe,
        CommonModule
    ]
})
export class DetailsProjectComponent {
    projetId!: string;
    projet!: Projet;

    constructor(
        private route: ActivatedRoute,
        private projetService: ProjetService
    ) {}

    ngOnInit(): void {
        this.projetId = this.route.snapshot.paramMap.get('id')!;
        this.getProjetDetails();
    }

    getProjetDetails(): void {
        this.projetService.getProjetById(this.projetId).subscribe({
            next: (data: Projet) => {
                console.log(data);
                this.projet = data;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération du projet', err);
            },
        });
    }


}
