import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { ListDemoRoutingModule } from './demo/components/uikit/list/listdemo-routing.module';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { seanceComponent } from './demo/components/seance/seance.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmploiComponent } from './demo/components/seance/emploi/emploi.component';

import { SeanceComponent } from './gestion-notes/seance/seance_note/seance.component';
import { SeanceModule } from './gestion-notes/seance/seance.module';
import { EvaluationComponent } from './demo/components/evaluation/evaluation.component';
import { AssignmentCalendarComponent } from './gestion-document/assignment/assignment-calendar/assignment-calendar.component';
import { CalendarAppModule } from './demo/components/apps/calendar/calendar.app.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ClassementComponent } from './gestion-notes/note/classement/classement.component';
 

import {TableDemoModule} from "./demo/components/uikit/table/tabledemo.module";
import { InputTextModule } from 'primeng/inputtext';




@NgModule({
    declarations: [
        AppComponent,
        seanceComponent,
        EmploiComponent,EvaluationComponent

    ],
    imports: [
        ToastModule,
        AppRoutingModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ListDemoRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextareaModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        DialogModule,
        TableModule,
        CardModule,
        InputNumberModule,
        FullCalendarModule,
        CalendarModule,
        TableDemoModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        InputTextModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
