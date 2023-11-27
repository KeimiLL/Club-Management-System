import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import {
    MatchEvent,
    MatchEventType,
} from "../../../../../../../../../shared/models/match-event.model";

const dumbEvent: MatchEvent = {
    minute: 10,
    event_type: MatchEventType.Goal,
    description: "Tu jest opis zdarzenia",
    is_own_event: true,
};

@Component({
    selector: "app-match-events",
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: "./match-events.component.html",
    styleUrls: ["./match-events.component.scss"],
})
export class MatchEventsComponent {
    MatchEventType = MatchEventType;
    dumbEvent = dumbEvent;
    @Input() public event: MatchEvent;
}
