import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarAppModule } from 'src/app/demo/components/apps/calendar/calendar.app.module';
import { AssignmentRoutingModule } from '../../assignment-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,CalendarAppModule,AssignmentRoutingModule
  ]
})
export class AssignmentCalendarModule { }
