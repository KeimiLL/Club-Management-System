import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthService } from "./auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
    standalone: true,
    imports: [CommonModule, RouterModule],
    providers: [AuthService],
})
export class AuthComponent {
    title = "Club Management System - Auth";
}
