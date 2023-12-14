import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { MatchEventsContainerComponent } from "../../../../../../../../../shared/components/match-events-container/match-events-container.component";
import { ScoreComponent } from "../../../../../../../../../shared/components/score/score.component";
import { LiveMatch } from "../../../../../../../../../shared/models/match.model";
import { MatchEvent } from "../../../../../../../../../shared/models/match-event.model";
import { LiveMatchesRootService } from "../../services/live-matches-root.service";

@Component({
    selector: "app-live-match[match]",
    standalone: true,
    imports: [CommonModule, ScoreComponent, MatchEventsContainerComponent],
    templateUrl: "./live-match.component.html",
    styleUrls: ["./live-match.component.scss"],
})
export class LiveMatchComponent {
    @Input() public match: LiveMatch;
    protected events$: Observable<MatchEvent[]>;

    constructor(private readonly root: LiveMatchesRootService) {}

    public fetchEvents$(): void {
        this.events$ = this.root.getMatchEventsByMatchId$(this.match.id);
    }
}
