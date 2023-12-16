import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { MatchEventsContainerComponent } from "../../../../../../../../../shared/components/match-events-container/match-events-container.component";
import { ScoreComponent } from "../../../../../../../../../shared/components/score/score.component";
import { LiveMatch } from "../../../../../../../../../shared/models/match.model";
import { MatchEvent } from "../../../../../../../../../shared/models/match-event.model";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";

@Component({
    selector: "app-live-match[match]",
    standalone: true,
    imports: [
        CommonModule,
        ScoreComponent,
        MatchEventsContainerComponent,
        MaterialModule,
    ],
    templateUrl: "./live-match.component.html",
    styleUrls: ["./live-match.component.scss"],
})
export class LiveMatchComponent {
    @Input() public match: LiveMatch;
    @Input() public events: MatchEvent[];
}
