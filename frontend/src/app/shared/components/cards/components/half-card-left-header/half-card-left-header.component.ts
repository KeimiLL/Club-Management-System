import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MaterialModule } from "../../../../modules/material.module";

@Component({
    selector: "app-half-card-left-header",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./half-card-left-header.component.html",
    styleUrls: ["./half-card-left-header.component.scss"],
})
export class HalfCardLeftHeaderComponent {
    @Input() public name: string;
    @Input() public subName: string;
}
