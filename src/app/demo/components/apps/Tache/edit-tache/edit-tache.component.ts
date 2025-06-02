import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {TacheService} from "../../../../service/tache.sevice";
import {StatutTacheEnum} from "../../../../api/statut-tache.enum";
import {TypeDureeEnum} from "../../../../api/type-duree.enum";



@Component({
    selector: 'app-edit-tache',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        InputTextareaModule,
        ButtonModule,
        RippleModule
    ],
    templateUrl: './edit-tache.component.html',
})
export class EditTacheComponent implements OnInit {
    tacheId!: string;

    tache: any = {
        titre: '',
        description: '',
        assigneA: '',
        dateDebut: '',
        dateFin: '',
        etat: 'Non commencée',
        avancement: 0,
        duree: 0,
        typeDuree: 'HEURE',
    };

    StatutTacheEnum = ['Non commencée', 'En cours', 'Terminée'];
    TypeDureeEnum = ['HEURE', 'JOUR'];

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private tacheService: TacheService
    ) {}

    ngOnInit(): void {
        this.tacheId = this.route.snapshot.paramMap.get('id')!;
        this.loadTache();
    }

    loadTache(): void {
        this.tacheService.getTacheById(this.tacheId).subscribe({
            next: (res) => {
                this.tache = res;
            },
            error: (err) => {
                console.error('Erreur lors du chargement de la tâche', err);
            }
        });
    }

    updateTache(): void {
        this.tacheService.updateTache(this.tacheId, this.tache).subscribe({
            next: () => {
                console.log('Tâche mise à jour avec succès');
                this.router.navigate(['/apps/tache/list']);
            },
            error: (err) => {
                console.error('Erreur lors de la mise à jour de la tâche', err);
            }
        });
    }
}
