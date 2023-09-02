import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
    selector: "app-logout",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./logout.component.html",
    styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    logout(): void {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}
