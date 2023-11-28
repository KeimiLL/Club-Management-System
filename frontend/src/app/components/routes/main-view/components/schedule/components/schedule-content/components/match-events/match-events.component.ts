import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
export class MatchEventsComponent implements OnInit {
    MatchEventType = MatchEventType;
    dumbEvent = dumbEvent;
    @Input() public event: MatchEvent;

    readonly #matIconRegistry = inject(MatIconRegistry);
    readonly #sanitizer = inject(DomSanitizer);

    ngOnInit(): void {
        this.#matIconRegistry.addSvgIcon(
            "goal-icon",
            this.#sanitizer.bypassSecurityTrustResourceUrl(
                "../../../../../../../../../../assets/icons/soccer_ball.svg"
            )
        );
    }
}
