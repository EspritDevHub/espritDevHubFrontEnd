import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PhaseListComponent} from "./list-phase/list-phase.component";
import {AddPhaseComponent} from "./add-phase/add-phase.component";
import {PhaseDetailsComponent} from "./details-phase/details-phase.component";
import {SprintEditComponent} from "./edit-phase/edit-phase.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', component: PhaseListComponent },
        { path: 'add', component: AddPhaseComponent },
        { path: 'details/:id', component: PhaseDetailsComponent },
        { path: 'edit/:id', component: SprintEditComponent },

        //{ path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list-project/list-project.component').then(m => m.BlogListModule) },
        // { path: 'detail', data: { breadcrumb: 'Detail' }, loadChildren: () => import('./blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
        // { path: 'edit', data: { breadcrumb: 'Edit' }, loadChildren: () => import('./blog-edit/blog-edit.module').then(m => m.BlogEditModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjetRoutingModule { }
