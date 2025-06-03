import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ProjetRoutingModule} from "./annoc.routing";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {RippleModule} from "primeng/ripple";
import {ChipModule} from "primeng/chip";
import {EditorModule} from "primeng/editor";


@NgModule({
    imports: [
        CommonModule,
        ProjetRoutingModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        RippleModule,
        ChipModule,
        EditorModule
    ]
})
export class AnnocModule { }
