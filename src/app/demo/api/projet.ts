import { EtatProjetEnum } from './etat-projet.enum';
import { EtapeProjetEnum } from './etape-projet.enum';
import { Jalon } from './jalon';


export interface Projet {
    id?: string;
    code: string;
    titre: string;
    description: string;

    etat: EtatProjetEnum;
    etapeProjet: EtapeProjetEnum;

    dateDebut: string;        // Format ISO ex: '2025-05-10'
    dateFinPrevu: string;

    groupeId: string;
    encadrantId: string;

    jalons: Jalon[];

    createdBy: number;
    creationDate: string;     // Format ISO
}

// Utilisé seulement si le backend retourne des tâches associées
//export interface ProjetWithTaches extends Projet {
    //taches: Tache[];

