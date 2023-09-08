import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { MaterialModule } from "../../../modules/material.module";

@Component({
    selector: "app-content-card",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./content-card.component.html",
    styleUrls: ["./content-card.component.scss"],
})
export class ContentCardComponent {}
