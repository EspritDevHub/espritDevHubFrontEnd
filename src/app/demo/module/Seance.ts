import { TypeNote } from "./TypeNote";

export interface Seance {
    id: string;
    titre: string;
    description: string;
    numero: number;
    note: number;
    sprintId: string;
    date: Date;
    typeNote: TypeNote;
   heureDebut: string;
  heureFin: string;
    salle?: string;
  enseignant?: string;
  modeEvaluation?: string;
  }