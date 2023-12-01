import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchEventsContainerComponent } from "../../../../../../../../../shared/components/match-events-container/match-events-container.component";
import { MatchEvent } from "../../../../../../../../../shared/models/match-event.model";

@Component({
    selector: "app-match-events",
    standalone: true,
    imports: [CommonModule, MatchEventsContainerComponent],
    templateUrl: "./match-events.component.html",
    styleUrls: ["./match-events.component.scss"],
})
export class MatchEventsComponent {
    @Input() public events: MatchEvent[];
}
