import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {Sprint} from "../../../../module/sprint";
import {SprintService} from "../../../../service/sprint.service";

@Component({
    selector: 'app-details-project',
    standalone: true,

    templateUrl: './details-project.component.html',

    imports: [
        DatePipe,
        CommonModule
    ]
})
export class SprintDetailsComponent implements OnInit {
    sprint?: Sprint;

    constructor(
        private route: ActivatedRoute,
        private sprintService: SprintService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.sprintService.getById(id).subscribe(data => {
                this.sprint = data;
            });
        }
    }
}

