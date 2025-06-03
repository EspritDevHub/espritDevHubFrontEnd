import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SprintListComponent} from "./list-sprint/list-project.component";
import {SprintFormComponent} from "./add-sprint/add-sprint.component";
import {SprintDetailsComponent} from "./details-sprint/details-project.component";
import {SprintEditComponent} from "./edit-sprint/edit-project.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', component: SprintListComponent },
        { path: 'add', component: SprintFormComponent },
        { path: 'details/:id', component: SprintDetailsComponent },
        { path: 'edit/:id', component: SprintEditComponent },

        //{ path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list-project/list-project.component').then(m => m.BlogListModule) },
        // { path: 'detail', data: { breadcrumb: 'Detail' }, loadChildren: () => import('./blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
        // { path: 'edit', data: { breadcrumb: 'Edit' }, loadChildren: () => import('./blog-edit/blog-edit.module').then(m => m.BlogEditModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjetRoutingModule { }
