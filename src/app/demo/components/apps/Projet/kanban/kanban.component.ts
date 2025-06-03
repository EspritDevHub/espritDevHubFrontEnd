import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjetService } from 'src/app/demo/service/projet.sevice';
import { Projet } from 'src/app/demo/api/projet';

@Component({
    selector: 'app-kanban',
    standalone: true,
    imports: [CommonModule, DragDropModule],
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
    kanbanColumns: { [etat: string]: Projet[] } = {};

    constructor(private projetService: ProjetService) {}

    ngOnInit(): void {
        this.projetService.getProjetsParEtatKanban().subscribe({
            next: (data) => {
                console.log('Données Kanban reçues:', data);
                this.kanbanColumns = data;
            },
            error: (err) => {
                console.error('Erreur lors du chargement du Kanban:', err);
            }
        });
    }

    onDrop(event: CdkDragDrop<Projet[]>, newEtat: string) {
        const projet = event.item.data;

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            this.projetService.updateEtatEtOrdre(projet.id, newEtat, event.currentIndex).subscribe({
                next: () => console.log('Projet mis à jour'),
                error: (err) => console.error('Erreur mise à jour projet:', err)
            });
        }
    }
}
