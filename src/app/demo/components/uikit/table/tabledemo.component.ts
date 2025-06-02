import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Projet } from 'src/app/demo/api/projet';
import { Tache } from 'src/app/demo/api/tache';
import { ProjetService } from 'src/app/demo/service/projet.sevice';
import { TacheService } from 'src/app/demo/service/tache.sevice';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [ProjetService, TacheService]
})
export class TabledemoComponent implements OnInit {
    projets: Projet[] = [];
    taches: Tache[] = [];
    statuts: any[] = [];
    responsables: any[] = [];
    loading: boolean = false;
    errorMessage: string = '';

    projects: Projet[] = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private projetService: ProjetService,
        private tacheService: TacheService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.projetService.getAllProjets().subscribe({
            next: (data) => (this.projects = data,
                console.log('Projets chargés:', this.projects)
            ),

            error: (err) => console.error('Erreur de chargement des projets:', err),
          });
                

        this.loadProjetsAvecTaches();
    }

    loadProjetsAvecTaches(): void {
        this.projetService.getAllProjets().subscribe({
            next: (projets) => {
                const observables = projets.map(projet =>
                    this.tacheService.getTachesByProjet(projet.id!)
               );

                forkJoin(observables).subscribe({
                    next: (tachesArray) => {
                        this.projets = projets.map((projet, index) => ({
                            ...projet,
                            taches: tachesArray[index]
                        }));
                        this.taches = tachesArray.flat();
                        this.loading = false;
                    },
                    error: (err) => {
                        this.loading = false;
                        this.errorMessage = 'Erreur lors du chargement des tâches.';
                    }
                });
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = 'Erreur lors du chargement des projets.';
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    addProjet(projet: Projet): void {
        this.projetService.addProjet(projet).subscribe({
            next: (newProjet) => {
                this.projets.push(newProjet);
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors de l\'ajout du projet.';
            }
        });
    }

    deleteProjet(projetId: string): void {
        this.projetService.deleteProjet(projetId).subscribe({
            next: () => {
                this.projets = this.projets.filter(projet => projet.id !== projetId);
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors de la suppression du projet.';
            }
        });
    }

    updateProjet(projet: Projet): void {
        if (projet.id) {
            this.projetService.updateProjet(projet.id, projet).subscribe({
                next: (updatedProjet) => {
                    const index = this.projets.findIndex(p => p.id === updatedProjet.id);
                    if (index !== -1) {
                        this.projets[index] = updatedProjet;
                    }
                },
                error: (err) => {
                    this.errorMessage = 'Erreur lors de la mise à jour du projet.';
                }
            });
        }
    }

    addTache(tache: Tache): void {
        this.tacheService.addTache(tache).subscribe({
            next: (newTache) => {
                this.taches.push(newTache);
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors de l\'ajout de la tâche.';
            }
        });
    }

    deleteTache(tacheId: string): void {
        this.tacheService.deleteTache(tacheId).subscribe({
            next: () => {
                this.taches = this.taches.filter(tache => tache.id !== tacheId);
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors de la suppression de la tâche.';
            }
        });
    }

    updateTache(tache: Tache): void {
        if (tache.id) {
            this.tacheService.updateTache(tache.id, tache).subscribe({
                next: (updatedTache) => {
                    const index = this.taches.findIndex(t => t.id === updatedTache.id);
                    if (index !== -1) {
                        this.taches[index] = updatedTache;
                    }
                },
                error: (err) => {
                    this.errorMessage = 'Erreur lors de la mise à jour de la tâche.';
                }
            });
        }
    }
}
