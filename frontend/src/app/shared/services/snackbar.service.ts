import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../components/snackbar/snackbar.component";

@Injectable({
    providedIn: "root",
})
export class SnackbarService {
    constructor(private readonly snackBar: MatSnackBar) {}

    public showNormalSnackBar(message: string, time = 3000): void {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                message: message,
                variant: "normal",
            },
            duration: time,
        });
    }

    public showErrorSnackBar(response: HttpErrorResponse, time = 3000): void {
        this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
                message: response.error.Param,
                variant: "error",
            },
            duration: time,
        });
    }
}
