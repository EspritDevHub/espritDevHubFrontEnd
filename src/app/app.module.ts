import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { SeanceComponent } from './gestion-notes/seance/seance_note/seance.component';
import { SeanceModule } from './gestion-notes/seance/seance.module';
import { EvaluationComponent } from './gestion-document/Evaluation/evaluation/evaluation.component';
import { AssignmentCalendarComponent } from './gestion-document/assignment/assignment-calendar/assignment-calendar.component';
import { CalendarAppModule } from './demo/components/apps/calendar/calendar.app.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ClassementComponent } from './gestion-notes/note/classement/classement.component';
 

@NgModule({
    declarations: [
        AppComponent,
         
        
        
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,CalendarAppModule,FullCalendarModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
