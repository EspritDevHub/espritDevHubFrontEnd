import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabledemoComponent} from './tabledemo.component';

const routes: Routes = [
    { path: '', component: TabledemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]  // Exportez uniquement RouterModule
})
export class TableDemoRoutingModule { }
