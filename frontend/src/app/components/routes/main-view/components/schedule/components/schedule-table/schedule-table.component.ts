import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { ScheduleRootService } from "../../services/schedule-root.service";

@Component({
    selector: "app-schedule-table",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./schedule-table.component.html",
    styleUrls: ["./schedule-table.component.scss"],
    providers: [ScheduleRootService],
})
export class ScheduleTableComponent {}
