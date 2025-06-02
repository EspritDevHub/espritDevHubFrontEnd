import { Component, OnInit } from '@angular/core';
import { SeanceService } from '../../service/seance.service';
import { Seance } from '../../module/Seance';
import { Table } from 'primeng/table';
import { TypeNote } from '../../module/TypeNote';
import { MessageService } from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss']
})
export class seanceComponent implements OnInit {

  seances: Seance[] = [];
  displayAddDialog: boolean = false;
  displayCalendar: boolean = false;
  loading: boolean = true;

  isEditMode: boolean = false;
  editedSeanceId: any | null = null;

  newSeance: Seance = this.initSeance();

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [], // sera mis à jour dynamiquement
  editable: false,
  selectable: true
};

  constructor(
    private seanceService: SeanceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSeances();
  }

  // Charger les séances puis mettre à jour le calendrier
    loadSeances(): void {
      this.seanceService.getAll().subscribe({
        next: (data) => {
          
          this.seances = data;
          this.loading = false;
          this.updateCalendarEvents();  // Mettre à jour les événements du calendrier après chargement
        },
        error: (err) => {
          console.error('Erreur lors du chargement des séances', err);
          this.loading = false;
        }
      });
    }

  // Met à jour la liste des événements dans le calendrier à partir des séances
updateCalendarEvents(): void {
  this.calendarOptions.events = this.seances.map(s => {
    const date = new Date(s.date);
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const start = `${dateStr}T${s.heureDebut}`;
    const end = `${dateStr}T${s.heureFin}`;

    return {
      id: s.id.toString(),
      title: s.titre,
      start,
      end,
      allDay: false
    };
  });
}


  // Afficher le dialog calendrier et mettre à jour les événements
showCalendar(): void {
  this.updateCalendarEvents();
  this.displayCalendar = true;
}

  typeNoteOptions = [
    { label: 'Tous les types', value: null },
    { label: 'Groupe', value: 'GROUPE' },
    { label: 'Individuel', value: 'INDIVIDUELLE' }
  ];

  initSeance(): Seance {
    return {
      id: '0',
      titre: '',
      description: '',
      numero: 1,
      note: 0,
      sprintId: '',
      date: new Date(),
      typeNote: TypeNote.GROUPE,
      heureDebut: '', // Heure actuelle par défaut
      heureFin: ''
    };
  }

  isHeureValide(): boolean {
  if (!this.newSeance.heureDebut || !this.newSeance.heureFin) {
    return true; // Pas encore rempli, donc on ne bloque pas
  }

  const [hDeb, mDeb] = this.newSeance.heureDebut.split(':').map(Number);
  const [hFin, mFin] = this.newSeance.heureFin.split(':').map(Number);

  const debut = hDeb * 60 + mDeb;
  const fin = hFin * 60 + mFin;

  return debut < fin;
}


  showAddDialog(): void {
    this.resetNewSeance();
    this.displayAddDialog = true;
    this.isEditMode = false;
    this.editedSeanceId = null;
  }

  resetNewSeance(): void {
    this.newSeance = this.initSeance();
  }

  hideAddDialog(): void {
    this.displayAddDialog = false;
  }

  editSeance(seance: Seance): void {
    this.newSeance = { ...seance };
    this.editedSeanceId = seance.id;
    this.isEditMode = true;
    this.displayAddDialog = true;
  }

  saveSeance(): void {
    if (!this.isValidSeance()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Champs invalides',
        detail: 'Tous les champs obligatoires doivent être remplis, la date doit être après demain et le numéro >= 1.'
      });
      return;
    }

    if (this.isEditMode && this.editedSeanceId != null) {
      this.seanceService.update(this.editedSeanceId, this.newSeance).subscribe({
        next: (updated) => {
          const index = this.seances.findIndex(s => s.id === this.editedSeanceId);
          if (index !== -1) this.seances[index] = updated;
          this.afterSave('Mise à jour', 'Séance mise à jour avec succès');
          this.updateCalendarEvents(); // Mise à jour calendrier après modification
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour' });
        }
      });
    } else {
      const seanceToCreate = { ...this.newSeance };
      this.seanceService.create(seanceToCreate).subscribe({
        next: (created) => {
          this.seances.push(created);
          this.afterSave('Création', 'Séance créée avec succès');
          this.updateCalendarEvents(); // Mise à jour calendrier après création
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création' });
        }
      });
    }
  }

  private afterSave(summary: string, detail: string): void {
    this.hideAddDialog();
    this.messageService.add({ severity: 'success', summary, detail });
    this.isEditMode = false;
    this.editedSeanceId = null;
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteSeance(seance: Seance): void {
    if (confirm(`Voulez-vous vraiment supprimer la séance "${seance.titre}" ?`)) {
      this.seanceService.delete(seance.id).subscribe({
        next: () => {
          this.seances = this.seances.filter(s => s.id !== seance.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Suppression',
            detail: 'Séance supprimée avec succès'
          });
          this.updateCalendarEvents(); // Mise à jour calendrier après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la suppression de la séance'
          });
        }
      });
    }
  }

isValidSeance(): boolean {
  const { titre, description, numero, date, typeNote, heureDebut, heureFin } = this.newSeance;

  const isRequiredFieldsFilled =
    !!titre &&
    !!description &&
    typeof numero === 'number' &&
    numero >= 1 &&
    !!date &&
    !!typeNote &&
    !!heureDebut &&
    !!heureFin;

  const isDateValid = date ? new Date(date).getTime() > this.getTomorrow().getTime() : false;
  const isNotSunday = new Date(date).getDay() !== 0; // Ne pas planifier le dimanche
  const isTimeValid = this.isHeureValide();

  return isRequiredFieldsFilled && isDateValid && isNotSunday && isTimeValid;
}

  getTomorrow(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() +1 );
    return tomorrow;
  }

  // ---------- AJOUT POUR CALENDRIER ----------

  // Indique si la date contient au moins une séance
  isDateWithSeance(date: Date): boolean {
    if (!this.seances) return false;
    return this.seances.some(s => {
      const seanceDate = new Date(s.date);
      return (
        seanceDate.getFullYear() === date.getFullYear() &&
        seanceDate.getMonth() === date.getMonth() &&
        seanceDate.getDate() === date.getDate()
      );
    });
  }

}
