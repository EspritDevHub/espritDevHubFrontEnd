import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
        
            {
                label: 'Notes',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Notes',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'Prof-Seances',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/seances/list']
                            },
                            {
                                label: 'Admin/Prof-Criteres',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/criteres/list']
                            },
                            {
                                label: 'Etudiants-List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/blog/edit']
                            }
                        ]
                    },
                    {
                        label: 'Calendar',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/apps/calendar']
                    },

                    {
                        label: 'Feedback',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/evaluation']
                    },
                    {
                        label: 'Chat',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/apps/chat']
                    },
                    {
                        label: 'Files',
                        icon: 'pi pi-fw pi-folder',
                        routerLink: ['/apps/files']
                    },
                    {
                        label: 'Kanban',
                        icon: 'pi pi-fw pi-sliders-v',
                        routerLink: ['/apps/kanban']
                    },
                    {
                        label: 'Mail',
                        icon: 'pi pi-fw pi-envelope',
                        items: [
                            {
                                label: 'Inbox',
                                icon: 'pi pi-fw pi-inbox',
                                routerLink: ['/apps/mail/inbox']
                                routerLink: ['/apps/notes/list']
                            },
                               {
                                label: 'Classement-List',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/apps/notes/classement']
                            }
                        ]
                    },
                    {
                        label: 'Document',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'Prof-Assignments',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/assignment/list']
                            },
                            {
                                label: 'Calendar-Assignments',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/assignment/calendar']
                            },
                            {
                                label: "AIDE à L'Evaluation",
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/evaluations/list']
                            },
                            {
                                label: 'Etudiant-Documents',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/documents/list']
                            }
                        ]
                    }]}]}}
