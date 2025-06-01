import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
})
export class ClassementComponent implements OnInit {
  classement: any[] = [];
  reussiteStats: any[] = [];
  filteredSeanceId: string = 'all';
data :any ;chartType:any ; 
  chartLabels: string[] = [];

chartData: ChartData<'bar'> = {
  labels: ["Réussite"],
  datasets: []
};
  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getClassement();
    this.getReussite();

     // Refresh every 30 seconds
  setInterval(() => {
    this.getClassement();
    this.getReussite();
  }, 30000); 
  }

  getClassement() {
    this.http.get<any>('http://localhost:9091/api/classement/top-etudiants')
      .subscribe(res => this.classement = res.classement);
  }

  getReussite() {
    this.http.get<any[]>('http://localhost:9091/api/classement/reussite')
      .subscribe(res => {
        this.reussiteStats = res;
        this.updateChart();
      });
  }
updateChart() {
  const filtered = this.filteredSeanceId === 'all'
    ? this.reussiteStats
    : this.reussiteStats.filter(r => r.seanceId === this.filteredSeanceId);

  this.chartLabels = filtered.map(r => r.seanceTitre);

  this.chartData = {
    labels: this.chartLabels,
    datasets: [
      {
        data: filtered.map(r => r.pourcentageReussite),
        label: 'Réussite (%)'
      }
    ]
  };
}


  onFilterChange() {
    this.updateChart();
  }

  get filteredClassement() {
    return this.filteredSeanceId === 'all'
      ? this.classement
      : this.classement.filter(c => c.seanceId === this.filteredSeanceId);
  }
}
