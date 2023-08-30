import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { SnackbarComponent } from "../components/snackbar/snackbar.component";

@Injectable({
    providedIn: "root",
})
export class SnackbarService {
    constructor(private readonly snackBar: MatSnackBar) {}

    public showSnackBar(
        message: string,
        variant: "normal" | "error" | "warn" = "normal",
        time = 3000
    ): void {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                message,
                variant,
            },
            duration: time,
        });
    }

    public showHttpErrorSnackBar(
        response: HttpErrorResponse,
        time = 3000
    ): void {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                message: `Error: ${response.status}, ${response.statusText}`,
                variant: "error",
            },
            duration: time,
        });
    }
}
