import { StatutTacheEnum } from 'src/app/demo/api/statut-tache.enum';
import { TypeDureeEnum } from './type-duree.enum';

export interface Tache {
    id?: string;                 // Identifiant de la tâche (optionnel à la création)
    titre: string;              // Titre ou nom de la tâche
    description: string;        // Description de la tâche
    assigneA: string;           // Personne assignée

    dateDebut: string;          // Format ISO avec heure: '2025-05-10T08:00:00'
    dateFin: string;            // Format ISO avec heure

    etat: StatutTacheEnum;        // Enumération : EN_ATTENTE, EN_COURS, TERMINE...
    avancement: number;         // Pourcentage d’avancement (0 à 100)

    duree: number;              // Durée (float ou int)
    typeDuree: TypeDureeEnum;   // Enum : JOUR, HEURE...
}
