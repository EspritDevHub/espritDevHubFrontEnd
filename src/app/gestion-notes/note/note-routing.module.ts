import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { ClassementComponent } from './classement/classement.component';


const routes: Routes = [
  { path: 'list', component: NoteComponent },
    { path: 'classement', component: ClassementComponent },         
         
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
