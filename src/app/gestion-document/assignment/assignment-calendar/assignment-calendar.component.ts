import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment-calendar.component.html',
})
export class AssignmentCalendarComponent implements OnInit {
  assignments: any[] = [];
  selectedAssignment: any = null;
  showDialog: boolean = false;
  isExpired: boolean = false;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.getAll().subscribe((assignments) => {
      this.assignments = assignments;
      this.calendarOptions.events = this.buildCalendarEvents(assignments);
    });
  }

  buildCalendarEvents(assignments: any[]) {
    const today = new Date();
    return assignments.map((assignment) => {
      const dueDate = new Date(assignment.dateLimite);
      const daysDiff = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      let bgColor = '';
      if (dueDate < today) {
        bgColor = '#f87171'; // rouge
      } else if (daysDiff <= 1) {
        bgColor = '#fde047'; // jaune
      } else if (daysDiff <= 3) {
        bgColor = '#fb923c'; // orange
      } else {
        bgColor = '#4ade80'; // vert
      }

      return {
        title: assignment.titre,
        date: assignment.dateLimite,
        backgroundColor: bgColor,
        extendedProps: { assignment },
      };
    });
  }

  handleEventClick(info: any) {
    const assignment = info.event.extendedProps.assignment;
    const deadline = new Date(assignment.dateLimite);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    this.selectedAssignment = assignment;
    this.isExpired = deadline < today;
    this.showDialog = true;
  }

  submitAssignment() {
    this.showDialog = false;
    window.location.href = 'http://localhost:4200/#/apps/documents/list';
  }
}
