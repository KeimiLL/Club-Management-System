import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MaterialModule } from "../../../../modules/material.module";

@Component({
    selector: "app-section-header",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./section-header.component.html",
    styleUrls: ["./section-header.component.scss"],
})
export class SectionHeaderComponent {
    @Input() public name: string;
}
