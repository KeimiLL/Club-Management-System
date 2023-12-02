import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchEventsContainerComponent } from "../../../../../../../../../shared/components/match-events-container/match-events-container.component";
import { MatchEvent } from "../../../../../../../../../shared/models/match-event.model";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { ScheduleRootService } from "../../../../services/schedule-root.service";

@Component({
    selector: "app-match-events",
    standalone: true,
    imports: [CommonModule, MatchEventsContainerComponent, MaterialModule],
    templateUrl: "./match-events.component.html",
    styleUrls: ["./match-events.component.scss"],
})
export class MatchEventsComponent {
    @Input() public events: MatchEvent[];
    @Input() public hasEnded: boolean;
    @Input() public hasStarted: boolean;

    constructor(private readonly root: ScheduleRootService) {}

    protected toggleAddEventPopup(): void {
        this.root.openAddEventPopup();
    }

    protected changeState(): void {
        this.root.changeMatchState(this.hasStarted, this.hasEnded);
    }
}
