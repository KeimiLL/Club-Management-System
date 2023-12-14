import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { LiveMatchesComponent } from "./components/live-matches/live-matches.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [CommonModule, LiveMatchesComponent],
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {}
