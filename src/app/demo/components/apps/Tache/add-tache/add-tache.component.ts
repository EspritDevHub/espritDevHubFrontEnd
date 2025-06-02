import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { StatutTacheEnum } from 'src/app/demo/api/statut-tache.enum';
import { TypeDureeEnum } from 'src/app/demo/api/type-duree.enum';
import { Tache } from 'src/app/demo/api/tache';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TacheService } from '../../../../service/tache.sevice';

@Component({
    selector: 'app-add-tache',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        RippleModule,
    ],
    templateUrl: './add-tache.component.html',
})
export class AddTacheComponent {
    tache: Tache = {} as Tache;

    statutOptions = Object.values(StatutTacheEnum);
    typeDureeOptions = Object.values(TypeDureeEnum);

    statutLabels: Record<StatutTacheEnum, string> = {
        [StatutTacheEnum.NON_COMMENCEE]: 'Non commencée',
        [StatutTacheEnum.EN_COURS]: 'En cours',
        [StatutTacheEnum.TERMINEE]: 'Terminée',
    };

    typeDureeLabels: Record<TypeDureeEnum, string> = {
        [TypeDureeEnum.HEURE]: 'Heure',
        [TypeDureeEnum.JOUR]: 'Jour',
    };

    constructor(private tacheService: TacheService, private router: Router) {
        this.resetTache();
    }

    // Formatage au format datetime-local (YYYY-MM-DDTHH:mm)
    private formatForInput(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    private resetTache(): void {
        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
        this.tache = {
            titre: '',
            description: '',
            assigneA: '',
            dateDebut: this.formatForInput(now),
            dateFin: this.formatForInput(oneHourLater),
            etat: StatutTacheEnum.NON_COMMENCEE,
            avancement: 0,
            duree: 1,
            typeDuree: TypeDureeEnum.JOUR,
        };
    }

    addTache(): void {
        // Convertir les dates au format ISO avant envoi
        const tacheToSend: Tache = {
            ...this.tache,
            dateDebut: new Date(this.tache.dateDebut).toISOString(),
            dateFin: new Date(this.tache.dateFin).toISOString(),
        };

        console.log('Tâche envoyée:', tacheToSend);

        this.tacheService.addTache(tacheToSend).subscribe({
            next: (res) => {
                console.log('Tâche ajoutée avec succès', res);
                this.router.navigate(['/apps/tache/list']);
            },
            error: (err) => {
                console.error('Erreur lors de l\'ajout de la tâche', err);
            },
        });
    }

    resetForm(form: NgForm): void {
        form.resetForm();
        this.resetTache();
    }
}
