import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Projet} from "../../../../api/projet";
import {ProjetService} from "../../../../service/projet.sevice";
import {Router} from "@angular/router";
import {EtatProjetEnum} from "../../../../api/etat-projet.enum";
import {EtapeProjetEnum} from "../../../../api/etape-projet.enum";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";



@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule, ButtonModule, RippleModule],
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent {
    projet: any = {
        code: '',
        titre: '',
        description: '',
        dateDebut: new Date().toISOString().split('T')[0],
        dateFinPrevu: new Date().toISOString().split('T')[0],
        createdBy: 0,
    };

    constructor(private projetService: ProjetService, private router: Router) {}

    addProjet(): void {
        if (!this.projet.code || !this.projet.titre || !this.projet.description) return;

        this.projetService.addProjet(this.projet).subscribe({
            next: (res) => {
                console.log('Projet ajouté avec succès', res);
                this.router.navigate(['/apps/projet/list']);
            },
            error: (err) => {
                console.error('Erreur lors de l’ajout du projet', err);
            },
        });
    }

    resetForm(form: any): void {
        form.resetForm();
        this.projet = {
            code: '',
            titre: '',
            description: '',
            dateDebut: new Date().toISOString().split('T')[0],
            dateFinPrevu: new Date().toISOString().split('T')[0],
            createdBy: 0,
        };
    }

}
