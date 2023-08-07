import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root",
})
export class SnackbarService {
    constructor(private readonly snackBar: MatSnackBar) {}

    public showSnackMessage(message: string, time = 3000): void {
        this.snackBar.open(message, "", {
            duration: time, // 3 seconds
        });
    }

    public showHttpErrorResponse(
        response: HttpErrorResponse,
        time = 3000
    ): void {
        this.snackBar.open(response.error.Param, "Close", {
            duration: time, // 5 seconds
        });
    }
}
