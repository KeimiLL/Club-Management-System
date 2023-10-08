import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { MaterialModule } from "../../../modules/material.module";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
    selector: "app-content-card",
    standalone: true,
    imports: [CommonModule, MaterialModule, SpinnerComponent],
    templateUrl: "./content-card.component.html",
    styleUrls: ["./content-card.component.scss"],
})
export class ContentCardComponent {}
