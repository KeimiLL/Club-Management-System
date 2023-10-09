import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import {
    HtmlEditorService,
    ImageService,
    LinkService,
    RichTextEditorComponent,
    RichTextEditorModule,
    ToolbarService,
} from "@syncfusion/ej2-angular-richtexteditor";

import { CustomToolbar } from "../../models/misc.model";

@Component({
    selector: "app-markup",
    standalone: true,
    imports: [CommonModule, RichTextEditorModule],
    providers: [HtmlEditorService, ImageService, LinkService, ToolbarService],
    templateUrl: "./markup.component.html",
    styleUrls: ["./markup.component.scss"],
})
export class MarkupComponent {
    @ViewChild("textEditor", { static: true })
    public componentObject!: RichTextEditorComponent;

    private buttonElement!: HTMLElement | null;
    private htmlContent!: string;

    public customToolbar: CustomToolbar = {
        items: ["Bold", "Italic", "Undo", "Redo"],
    };

    getContent(): void {
        this.buttonElement = document.getElementById("editor__save-button");
        this.htmlContent = this.componentObject.getHtml();
    }
}
