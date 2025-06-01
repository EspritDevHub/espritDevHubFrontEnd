import { Component } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent {
 constructor(
    private noteService: NoteService,
  ) {}

  classement: any[] = [];
reussiteStats: any[] = [];
ngOnInit() {
  this.noteService.getClassement().subscribe(data => {
    this.classement = data.classement;
  });

  this.noteService.getReussite().subscribe(data => {
    this.reussiteStats = data;
  });
}
}
