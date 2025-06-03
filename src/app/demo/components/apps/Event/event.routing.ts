import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListEventComponent} from "./list-event/list-project.component";
import {AddProjectComponent} from "./add-event/add-project.component";
import {DetailsProjectComponent} from "./details-project/details-project.component";
import {EditEventComponent} from "./edit-event/edit-project.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', component: ListEventComponent },
        { path: 'add', component: AddProjectComponent },
        { path: 'details/:id', component: DetailsProjectComponent },
        { path: 'edit/:id', component: EditEventComponent },

        //{ path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list-project/list-project.component').then(m => m.BlogListModule) },
        // { path: 'detail', data: { breadcrumb: 'Detail' }, loadChildren: () => import('./blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
        // { path: 'edit', data: { breadcrumb: 'Edit' }, loadChildren: () => import('./blog-edit/blog-edit.module').then(m => m.BlogEditModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjetRoutingModule { }
