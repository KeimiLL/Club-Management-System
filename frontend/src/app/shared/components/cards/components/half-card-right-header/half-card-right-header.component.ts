import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { MaterialModule } from "../../../../modules/material.module";

@Component({
    selector: "app-half-card-right-header",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./half-card-right-header.component.html",
    styleUrls: ["./half-card-right-header.component.scss"],
})
export class HalfCardRightHeaderComponent {
    @Input() public name: string;
    @Input() public subName: string;
    @Output() protected closedClicked = new EventEmitter<void>();
}
