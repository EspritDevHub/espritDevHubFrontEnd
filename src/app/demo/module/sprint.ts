export interface Sprint {
    id?: string;
    title: string;
    phaseId: string;
    phaseName?: string; // <-- ce champ doit être présent
    startDate: string;
    endDate: string;
    status: string;
    active: boolean;
}

