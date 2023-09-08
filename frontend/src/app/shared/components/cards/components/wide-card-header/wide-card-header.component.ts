import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MaterialModule } from "../../../../modules/material.module";

@Component({
    selector: "app-wide-card-header",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./wide-card-header.component.html",
    styleUrls: ["./wide-card-header.component.scss"],
})
export class WideCardHeaderComponent {
    @Input() public name: string;
    @Input() public subName = "";
}
