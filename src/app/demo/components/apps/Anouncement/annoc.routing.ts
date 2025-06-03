import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListAnnocComponent} from "./list-annoc/list-project.component";
import {AddAnnocComponent} from "./add-annoc/add-annoc.component";
import {EventDetailsComponent} from "./details-annoc/details-project.component";
import {EditAnnocComponent} from "./edit-annoc/edit-project.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', component: ListAnnocComponent },
        { path: 'add', component: AddAnnocComponent },
        { path: 'details/:id', component: EventDetailsComponent },
        { path: 'edit/:id', component: EditAnnocComponent },

        //{ path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list-project/list-project.component').then(m => m.BlogListModule) },
        // { path: 'detail', data: { breadcrumb: 'Detail' }, loadChildren: () => import('./blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
        // { path: 'edit', data: { breadcrumb: 'Edit' }, loadChildren: () => import('./blog-edit/blog-edit.module').then(m => m.BlogEditModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProjetRoutingModule { }
