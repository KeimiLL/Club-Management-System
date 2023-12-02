import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchEventsContainerComponent } from "../../../../../../../../../shared/components/match-events-container/match-events-container.component";
import { MatchState } from "../../../../../../../../../shared/models/match.model";
import { MatchEvent } from "../../../../../../../../../shared/models/match-event.model";
import { ScheduleContentService } from "../../../../services/schedule-content.service";

@Component({
    selector: "app-match-events",
    standalone: true,
    imports: [CommonModule, MatchEventsContainerComponent],
    templateUrl: "./match-events.component.html",
    styleUrls: ["./match-events.component.scss"],
})
export class MatchEventsComponent {
    @Input() public events: MatchEvent[];
    @Input() public state: MatchState;

    constructor(private readonly content: ScheduleContentService) {}

    protected toggleAddEventPopup(): void {
        this.content.openAddEventPopup();
    }

    protected changeState(): void {
        this.content.changeMatchState();
    }
}
