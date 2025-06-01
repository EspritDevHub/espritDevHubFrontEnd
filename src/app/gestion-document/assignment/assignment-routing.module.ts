import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from './assignment/assignment.component';
import { AssignmentCalendarComponent } from './assignment-calendar/assignment-calendar.component';


const routes: Routes = [
  { path: 'list', component: AssignmentListComponent },     
  { path: 'calendar', component: AssignmentCalendarComponent },         
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
