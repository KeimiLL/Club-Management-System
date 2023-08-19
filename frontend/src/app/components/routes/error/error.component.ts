import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material.module";

@Component({
    selector: "app-error",
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterModule],
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.scss"],
})
export class ErrorComponent {}
