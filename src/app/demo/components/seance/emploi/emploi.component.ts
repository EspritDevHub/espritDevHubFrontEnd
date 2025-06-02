import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Seance } from 'src/app/demo/module/Seance';
import { SeanceService } from 'src/app/demo/service/seance.service';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.scss']
})
export class EmploiComponent {
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  weekSeances: { [key: string]: Seance[] } = {};
  loading = true;

  currentMonday!: Date;
  currentSunday!: Date;

  @ViewChild('planningToExport', { static: false }) planningToExport!: ElementRef;

  constructor(private seanceService: SeanceService) {
    this.days.forEach(day => this.weekSeances[day] = []);
  }

  ngOnInit(): void {
    this.setCurrentWeek(new Date());
    this.loadWeekSeances();
  }

  setCurrentWeek(today: Date): void {
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    this.currentMonday = monday;
    this.currentSunday = sunday;
  }

  loadWeekSeances(): void {
    this.loading = true;

    const start = this.currentMonday.toISOString().split('T')[0];
    const end = this.currentSunday.toISOString().split('T')[0];

    this.seanceService.getSeancesForWeek(start, end).subscribe({
      next: (data) => {
        this.organizeByDay(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.loading = false;
      }
    });
  }

  loadPreviousWeek(): void {
    this.currentMonday.setDate(this.currentMonday.getDate() - 7);
    this.setCurrentWeek(this.currentMonday);
    this.loadWeekSeances();
  }

  loadNextWeek(): void {
    this.currentMonday.setDate(this.currentMonday.getDate() + 7);
    this.setCurrentWeek(this.currentMonday);
    this.loadWeekSeances();
  }

  organizeByDay(seances: Seance[]): void {
    this.days.forEach(day => this.weekSeances[day] = []);

    seances.forEach(seance => {
      const date = new Date(seance.date);
      const dayIndex = (date.getDay() + 6) % 7; // 0 = lundi, 6 = dimanche
      if (dayIndex >= 0 && dayIndex < 6) { // exclut dimanche
        const dayName = this.days[dayIndex];
        this.weekSeances[dayName].push(seance);
      }
    });
  }

  getSeancesForDay(day: string): Seance[] {
    return this.weekSeances[day] || [];
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5).replace(':', 'H');
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  exportPDF(): void {
    const element = this.planningToExport.nativeElement;
    const options = {
      scale: 2,
      backgroundColor: '#FFFFFF',
      logging: false,
      useCORS: true
    };

    html2canvas(element, options).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
      pdf.save('emploi_du_temps.pdf');
    });
  }
}
