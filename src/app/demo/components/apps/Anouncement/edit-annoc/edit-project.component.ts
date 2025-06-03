import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {AnnocService} from "../../../../service/annoc.service";
import {MessageService} from "primeng/api";
import {Annoc} from "../../../../module/annoc";
import {Event} from "../../../../module/event";

@Component({
    selector: 'app-edit-project',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, InputTextareaModule,
        ButtonModule, RippleModule, CheckboxModule, InputTextModule],
    templateUrl: './edit-project.component.html',
})
export class EditAnnocComponent implements OnInit {
    annoc!: Annoc & { createdAt?: string; updatedAt?: string };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private annocService: AnnocService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.annocService.getById(id).subscribe({
                next: (data) => (this.annoc = data),
                error: (err) => console.error('Erreur de chargement de l\'annonce :', err)
            });
        }
    }

    updateAnnoc(): void {
        this.annoc.updatedAt = new Date().toISOString();
        this.annocService.update(this.annoc.id!,this.annoc).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Annonce mise à jour' });
                this.router.navigate(['/apps/annoc/list']);
            },
            error: (err) => {
                console.error('Erreur lors de la mise à jour de l\'annonce', err);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour' });
            }
        });
    }

    resetForm(): void {
        this.ngOnInit(); // recharge les données d'origine
    }
    private toInputDateTimeString(date?: string | Date): string {
        if (!date) return '';
        const d = new Date(date);
        const iso = d.toISOString();
        return iso.substring(0, 16);
    }
}
