import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { AssignmentService } from '../../assignment/assignment.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin, map } from 'rxjs';
import { Note } from 'src/app/gestion-notes/seance/note.model';
import { NoteService } from 'src/app/gestion-notes/note/note.service';
import { SeanceService } from 'src/app/gestion-notes/seance/seance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  documentsGrouped: Record<string, Record<string, any[]>> = {};
  documentsGrouped2: Record<string, Record<string, any[]>> = {};

  assignmentDescriptions: Record<string, string> = {};
  seanceId: any ;
  messageService: any;

  constructor(
    private evaluationService: EvaluationService,
    private assignmentService: AssignmentService,
    private sanitizer: DomSanitizer, private router: Router,
    private noteService: SeanceService,

  ) {}

  ngOnInit(): void {
    this.evaluationService.getAllDocuments().subscribe((docs) => {
      this.groupDocuments(docs);
    });
  }
  goToSeancesList() {
    this.router.navigate(['/seances/list']);
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  extractFilename(path: string): string {
    return path ? path.replace(/^.*[\\/]/, '') : '';
  }

  groupDocuments(documents: any[]): void {
    this.documentsGrouped = {};
    const uniqueAssignmentIds = Array.from(new Set(documents.map(doc => doc.assignmentId)));

    const fetchAssignments$ = uniqueAssignmentIds.map(id =>
      this.assignmentService.getByIdForEval(id).pipe(
        map(res => ({
          id,
          description: res?.description || 'Non définie',
        }))
      )
    );

    forkJoin(fetchAssignments$).subscribe(assignments => {
      assignments.forEach(a => {
        this.assignmentDescriptions[a.id] = a.description;
      });

      documents.forEach(doc => {
        const seanceKey = this.assignmentDescriptions[doc.assignmentId] || 'Non définie';
        const etudiantKey = doc.etudiantId || 'Inconnu';

        if (doc.nomFichier && doc.typedoc === 'DOCUMENT') {
          const filename = this.extractFilename(doc.nomFichier);
          doc.nomFichier = `assets/${filename}`;
        }

        if (!this.documentsGrouped[seanceKey]) {
          this.documentsGrouped[seanceKey] = {};
        }

        if (!this.documentsGrouped[seanceKey][etudiantKey]) {
          this.documentsGrouped[seanceKey][etudiantKey] = [];
        }

        this.documentsGrouped[seanceKey][etudiantKey].push(doc);
      });
    });
  }

  submitEvaluation(doc: any): void {
    const evaluation = {
      documentId: doc.id,
      enseignantId: 'PROF_ID_123', // Remplace dynamiquement
      note: doc.note,
      suggestion: doc.suggestion
    };

    this.evaluationService.submitEvaluation(evaluation).subscribe(() => {
      alert(' Évaluation envoyée avec succès.');
    });
  }

  SuggestEvaluationText(doc: any) {
    this.evaluationService.suggestEvaluationText(doc).subscribe({
      next: (res) => {
        console.log('Evaluation reçue :', res);
        doc.note = res.note;
        doc.commentaire = res.commentaire;
        doc.suggestion = res.suggestion;

      },
      error: (err) => {
        console.error('Erreur API:', err);
        alert('Erreur lors de l\'évaluation automatique.');
      }
    });
  }


  evaluerEtudiant( note: number, commentaire: string, suggestion: string) {
    const payload = {
      note,
      commentaire,
      suggestion
    };
  
    
    this.evaluationService.envoyerEmailEvaluation(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Email envoyé', detail: 'L’évaluation a été envoyée avec succès.' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'L’envoi de l’email a échoué.' });
      }
    });
  }
  evaluateGitLink(doc: any) {
console.log("cc",doc.nomFichier)
    this.evaluationService.evaluateGit(doc.nomFichier).subscribe({
      next: (res) => {
        doc.note = res.note;
        doc.commentaire = res.commentaire;
        doc.suggestion = res.suggestion;
        alert('Évaluation du dépôt Git effectuée avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de l’évaluation du dépôt Git:', err);
        alert('Échec de l’évaluation du dépôt Git.');
      }
    });
  }
 // Structure pour gérer l'ouverture des étudiants
 openedEtudiants: Record<string, Record<string, boolean>> = {};

 // ...

 toggleEtudiant(seanceKey: string, etudiantKey: string): void {
   if (!this.openedEtudiants[seanceKey]) {
     this.openedEtudiants[seanceKey] = {};
   }
   this.openedEtudiants[seanceKey][etudiantKey] = !this.openedEtudiants[seanceKey][etudiantKey];
 }

 isOpened(seanceKey: string, etudiantKey: string): boolean {
   return this.openedEtudiants[seanceKey]?.[etudiantKey] || false;
 }
  evaluateCahierCharge(doc: any) {
    
    this.evaluationService.evaluatePdf("http://localhost:9096/test.pdf").subscribe((result) => {
      doc.note = result.note;
      doc.commentaire = result.commentaire;
      doc.suggestion = result.suggestion;
    }, (err) => {
      console.error('Erreur lors de l’évaluation PDF:', err);
    });
  }
  
  
}
