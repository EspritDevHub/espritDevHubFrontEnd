import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import {ChipModule} from "primeng/chip";
import {EditorModule} from "primeng/editor";
import {TacheRoutingModule} from "./tache.routing";
import {RouterModule} from "@angular/router";




@NgModule({

    imports: [
        CommonModule,
        TacheRoutingModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        RippleModule,
        ChipModule,
        EditorModule

    ],
    exports: [
        RouterModule,
    ],
})
export class TacheModule { }
