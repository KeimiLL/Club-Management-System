import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

export interface SnackbarData {
    message: string;
    variant: "error" | "normal";
}

@Component({
    selector: "app-snackbar",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}
}
