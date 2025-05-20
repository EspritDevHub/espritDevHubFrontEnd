import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../../../service/projet.sevice';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-edit-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule, ButtonModule, RippleModule],
    templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
    projet: any = {
        code: '',
        titre: '',
        description: '',
        dateDebut: '',
        dateFinPrevu: '',
        createdBy: 0,
    };

    projetId!: string;

    constructor(
        private projetService: ProjetService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.projetId = this.route.snapshot.paramMap.get('id')!;
        this.projetService.getProjetById(this.projetId).subscribe({
            next: (res) => {
                this.projet = res;
            },
            error: (err) => {
                console.error('Erreur lors du chargement du projet', err);
            },
        });
    }

    updateProjet(): void {
        this.projetService.updateProjet(this.projetId, this.projet).subscribe({
            next: () => {
                console.log('Projet modifié avec succès');
                this.router.navigate(['/apps/projet/list']);
            },
            error: (err) => {
                console.error('Erreur lors de la modification', err);
            },
        });
    }
}
