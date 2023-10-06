import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { MaterialModule } from "../../modules/material.module";

@Component({
    selector: "app-spinner",
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent {}
