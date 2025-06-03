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
                label: 'Seances et Notes',
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
                    },


                ]
            },
             {
                label: 'Seance et Evaluation',
                icon: 'pi pi-th-large',
                items: [

                    {
                        label: 'Feedback',
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/evaluation']
                    },
                                        {
                        label: 'Seances',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/seance']
                    },



                ]
            },
            {
                label: 'Claims Management Details',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Claims\' List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['profile/list']
                    },
                    {
                        label: 'Create a new claim',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['profile/create']
                    }
                ]
            },
            {
                label: 'Notifications Management Details',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Notifications\' List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['notification/list']
                    },
                    {
                        label: 'Create a new Notifications',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['notification/create']
                    }
                ]
            },
            {
                label: 'Groups',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Groups',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['auth/groups']
                    }
                ]
            },
            {
                        label: 'Projet',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List ',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/projet/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/projet/add']
                            }
                        ]
                    },
                     {
                        label: 'Tache',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/tache/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/tache/add']
                            }
                        ]
                    },
                    {
                        label: 'Evenement',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/event/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/event/add']
                            }
                        ]
                    },
                    {
                        label: 'Announcement',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/annoc/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/annoc/add']
                            }
                        ]
                    }, {
                        label: 'Sprint',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/sprint/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/sprint/add']
                            }
                        ]
                    },{
                        label: 'Phase',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-image',
                                routerLink: ['/apps/phase/list']
                            },
                            {
                                label: 'Add',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/apps/phase/add']
                            }
                        ]
                    },


        ];
    }
}
