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
  weekSeances: {[key: string]: Seance[]} = {};
  loading = true;

  @ViewChild('planningToExport', { static: false }) planningToExport!: ElementRef;

  constructor(private seanceService: SeanceService) {
    this.days.forEach(day => this.weekSeances[day] = []);
  }

  ngOnInit(): void {
    this.loadWeekSeances();
  }

  loadWeekSeances(): void {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    // Format ISO sans le 'Z' pour éviter les problèmes de fuseau horaire
    const start = monday.toISOString().split('T')[0];
    const end = sunday.toISOString().split('T')[0];

    this.seanceService.getSeancesForWeek(start, end).subscribe({
      next: (data) => {
        this.organizeByDay(data);
        console.log(data)
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.loading = false;
      }
    });
  }

  organizeByDay(seances: Seance[]): void {
    // Réinitialiser
    this.days.forEach(day => this.weekSeances[day] = []);
    
    seances.forEach(seance => {
      const date = new Date(seance.date);
      const dayIndex = (date.getDay() + 6) % 7; // 0 = lundi
      if (dayIndex >= 0 && dayIndex < 6) {
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
    // Convertir "HH:mm:ss" en "HHHmm"
    return time.substring(0, 5).replace(':', 'H');
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