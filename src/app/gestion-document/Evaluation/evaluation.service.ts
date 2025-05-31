import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluationDto } from './evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private documentApiUrl = 'http://localhost:9096/api/documents';
  private evaluationApiUrl = 'http://localhost:9096/api/evaluations';
  private aiApiUrl = 'http://localhost:9096/api/evaluations/evaluer-text';
   pdfUrl :string = "http://localhost:4200/assets/test.pdf";

  constructor(private http: HttpClient) {}


  evaluateGit(gitLink: string) {
    return this.http.post<any>('http://localhost:9096/api/evaluations/analyser-git', gitLink );
  }

  evaluatePdf(pdfUrl: string): Observable<any> {
    const payload = { pdfUrl }; 
    return this.http.post<any>(
      'http://localhost:9096/api/evaluations/analyse-pdf',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  
  getAllDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.documentApiUrl}/documents`);
  }
  envoyerEmailEvaluation(payload: any) {
    return this.http.post('/api/envoyer-email-evaluation', payload);
  }
  getEvaluationsByDocument(documentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.evaluationApiUrl}/evaluations/document/${documentId}`);
  }

  submitEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(`${this.evaluationApiUrl}/evaluations`, evaluation);
  }

  
  suggestEvaluationText(doc: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'X-User-ID': '12'
    };
  
    // Construis ici le payload complet attendu par le backend
    const payload = {
      evaluationDto: {
        documentId: doc.id,
        enseignantId: 'prof1234',             // adapte selon contexte
        note: doc.note || null,
        commentaire: doc.commentaire || '',
        suggestion : doc.suggestion || '',
        dateEvaluation: new Date().toISOString(),
        fichierEvaluationUrl: ''              // si applicable
      },
      documentDto: doc
    };
  
    return this.http.post<any>(
      'http://localhost:9096/api/evaluations/evaluer-text',
      payload,
      { headers }
    );
  }
   
}
