import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: "app-teams-table",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./teams-table.component.html",
    styleUrls: ["./teams-table.component.scss"],
})
export class TeamsTableComponent {}
