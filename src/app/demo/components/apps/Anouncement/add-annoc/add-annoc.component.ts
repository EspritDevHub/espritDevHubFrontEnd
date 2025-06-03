import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Router} from "@angular/router";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {Annoc} from "../../../../module/annoc";
import {AnnocService} from "../../../../service/annoc.service";



@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule, ButtonModule, RippleModule, InputTextModule],
    templateUrl: './add-annoc.component.html',
})
export class AddAnnocComponent {
    annoc: Annoc = {
        title: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        isActive: false
    };


    eventTypes: string[] = ['MEETING', 'WORKSHOP', 'SEMINAR'];

    constructor(private annocService: AnnocService, private router: Router) {}

    addAnnoc(): void {
        const now = new Date().toISOString();
        this.annoc.createdAt = now;
        this.annoc.updatedAt = now;

        this.annocService.create(this.annoc).subscribe({
            next: () => {
                // Exemple : affichage d’un message + redirection
                this.router.navigate(['/apps/annoc/list']);
            },
            error: (err) => {
                console.error('Erreur lors de la création de l\'annonce', err);
            }
        });
    }

    resetForm(form: NgForm): void {
        form.resetForm();
        this.annoc = {
            title: '',
            content: '',
            createdAt: '',
            updatedAt: '',
            isActive: false
        };
    }


}
