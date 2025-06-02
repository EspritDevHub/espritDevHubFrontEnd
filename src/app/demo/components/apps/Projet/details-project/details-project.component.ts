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
    risqueRetard: { score: number; interpretation: string } | null = null;

    constructor(
        private route: ActivatedRoute,
        private projetService: ProjetService
    ) {}

    ngOnInit(): void {
        this.projetId = this.route.snapshot.paramMap.get('id')!;
        this.getProjetDetails();
        this.getRisqueRetard();
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
    getRisqueRetard(): void {
        this.projetService.getRisqueRetard(this.projetId).subscribe({
            next: (res) => {
                this.risqueRetard = res;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération du risque de retard', err);
            },
        });
    }
    getCouleurRisque(interpretation: string): string {
        if (interpretation.toLowerCase().includes('élevé')) {
            return 'red';
        } else if (interpretation.toLowerCase().includes('modéré')) {
            return 'orange';
        } else if (interpretation.toLowerCase().includes('faible')) {
            return 'green';
        }
        return 'gray'; // par défaut
    }



}
