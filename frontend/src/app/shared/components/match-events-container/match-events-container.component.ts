import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchEvent } from "../../models/match-event.model";
import { MatchEventComponent } from "./components/match-event/match-event.component";

@Component({
    selector: "app-match-events-container",
    standalone: true,
    imports: [CommonModule, MatchEventComponent],
    templateUrl: "./match-events-container.component.html",
    styleUrls: ["./match-events-container.component.scss"],
})
export class MatchEventsContainerComponent {
    @Input() public events: MatchEvent[];
}
