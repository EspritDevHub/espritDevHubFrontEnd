import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListTacheComponent } from './list-tache/list-tache.component';
import { AddTacheComponent } from './add-tache/add-tache.component';
import { DetailsTacheComponent } from './details-tache/details-tache.component';
import { EditTacheComponent } from './edit-tache/edit-tache.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', component: ListTacheComponent },
        { path: 'add', component: AddTacheComponent },
        { path: 'details/:id', component: DetailsTacheComponent },
        { path: 'edit/:id', component: EditTacheComponent },

    ])],
    exports: [RouterModule]
})
export class TacheRoutingModule { }
