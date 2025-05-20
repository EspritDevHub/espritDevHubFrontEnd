import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {TableDemoModule} from "./demo/components/uikit/table/tabledemo.module";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableDemoModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule



    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
