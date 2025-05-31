export interface EvaluationDto {
    id?: number;
    documentId: number;
    enseignantId: string;
    note: number;
    commentaire: string;
    suggestion?: string;
    fichierEvaluationUrl?: string;
    dateEvaluation?: Date;
  }
  