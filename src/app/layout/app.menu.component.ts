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
                        icon: 'pi pi-fw pi-comment',
                        routerLink: ['/evaluation']
                    },
                                        {
                        label: 'Seances',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/seance']
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
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Invoice',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/pages/invoice']
                    },
                    {
                        label: 'About Us',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/aboutus']
                    },
                    {
                        label: 'Help',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/help']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-fw pi-question',
                        routerLink: ['/pages/faq']
                    },
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: ['/pages/contact']
                    }
                ]
            },
            {
                label: 'E-Commerce',
                icon: 'pi pi-fw pi-wallet',
                items: [
                    {
                        label: 'Product Overview',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['ecommerce/product-overview']
                    },
                    {
                        label: 'Product List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['ecommerce/product-list']
                    },
                    {
                        label: 'New Product',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['ecommerce/new-product']
                    },
                    {
                        label: 'Shopping Cart',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['ecommerce/shopping-cart']
                    },
                    {
                        label: 'Checkout Form',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['ecommerce/checkout-form']
                    },
                    {
                        label: 'Order History',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['ecommerce/order-history']
                    },
                    {
                        label: 'Order Summary',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['ecommerce/order-summary']
                    }
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
                label: 'Hierarchy',
                icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-align-left',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Start',
                icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Buy Now',
                        icon: 'pi pi-fw pi-shopping-cart',
                        url: ['https://www.primefaces.org/store']
                    },
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: ['/documentation']
                    }
                ]
            }
        ];
    }
}
