import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'calendar', data: { breadcrumb: 'Calendar' }, loadChildren: () => import('./calendar/calendar.app.module').then(m => m.CalendarAppModule) },
        { path: 'tasklist', data: { breadcrumb: 'Task List' }, loadChildren: () => import('./tasklist/tasklist.app.module').then(m => m.TaskListAppModule) },
        { path: 'chat', data: { breadcrumb: 'Chat' }, loadChildren: () => import('./chat/chat.app.module').then(m => m.ChatAppModule) },
        { path: 'files', data: { breadcrumb: 'Files' }, loadChildren: () => import('./file/file.app.module').then(m => m.FileAppModule) },
        { path: 'mail', data: { breadcrumb: 'Mail' }, loadChildren: () => import('./mail/mail.app.module').then(m => m.MailAppModule) },
        { path: 'kanban', data: { breadcrumb: 'Kanban' }, loadChildren: () => import('./kanban/kanban.app.module').then(m => m.KanbanAppModule) },
        { path: 'projet', data: { breadcrumb: 'Projet' }, loadChildren: () => import('./Projet/projet.module').then(m => m.ProjetModule) },
        { path: 'tache', data: { breadcrumb: 'Tache' }, loadChildren: () => import('./Tache/tache.module').then(m => m.TacheModule) },
        { path: 'blog', data: { breadcrumb: 'Blog' }, loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
