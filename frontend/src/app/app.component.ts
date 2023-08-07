import { Component } from "@angular/core";
import { SnackbarService } from "./shared/services/snackbar.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(private readonly snack: SnackbarService) {
        snack.showSnackMessage("success");
    }
}
