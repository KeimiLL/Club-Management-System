import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { MaterialModule } from "../../../modules/material.module";

@Component({
    selector: "app-half-card-section",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./half-card-section.component.html",
    styleUrls: ["./half-card-section.component.scss"],
})
export class HalfCardSectionComponent {}
