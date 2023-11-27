import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { SpinnerComponent } from "../../../../../../../shared/components/spinner/spinner.component";
import {
    Match,
    MatchContentType,
    MatchScore,
} from "../../../../../../../shared/models/match.model";
import {
    MatchEvent,
    MatchEventType,
} from "../../../../../../../shared/models/match-event.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { MatchDetails } from "../schedule-popup/newMatchFormBuilder";
import { MatchDetailsComponent } from "./components/match-details/match-details.component";
import { MatchEventsComponent } from "./components/match-events/match-events.component";
import { MatchSquadComponent } from "./components/match-squad/match-squad.component";
import { ScoreComponent } from "./components/score/score.component";

const dumbEventsArray: MatchEvent[] = [
    {
        minute: 10,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 1",
        is_own_event: true,
    },
    {
        minute: 20,
        event_type: MatchEventType.RedCard,
        description: "To jest opis zdarzenia 2",
        is_own_event: true,
    },
    {
        minute: 48,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 3",
        is_own_event: false,
    },
    {
        minute: 70,
        event_type: MatchEventType.YellowCard,
        description: "To jest opis zdarzenia 4",
        is_own_event: false,
    },
    {
        minute: 88,
        event_type: MatchEventType.Goal,
        description: "To jest opis zdarzenia 5",
        is_own_event: true,
    },
];

@Component({
    selector: "app-schedule-content",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        MatchEventsComponent,
        MatchSquadComponent,
        MatchDetailsComponent,
        ScoreComponent,
        SpinnerComponent,
    ],
    templateUrl: "./schedule-content.component.html",
    styleUrls: ["./schedule-content.component.scss"],
})
export class ScheduleContentComponent {
    dumbEventsArray = dumbEventsArray;
    @Input() public set match(match: Match) {
        this.matchScore = { ...match };
        this.matchSquad = match.players.map((player) => player.user_full_name);
        this.matchBase = { ...match };
    }

    protected matchScore: MatchScore;
    protected matchSquad: string[];
    protected matchBase: MatchDetails;

    protected isCurrentMatchLoading$: Observable<boolean>;
    protected spinnerMessage = "Loading selected match...";

    protected readonly contentTypes = MatchContentType;
    protected readonly contentType$: Observable<MatchContentType>;

    constructor(
        private readonly content: ScheduleContentService,
        private readonly split: SplitViewManagerService<Match>
    ) {
        this.contentType$ = this.content.contentType$;
        this.isCurrentMatchLoading$ = this.split.isLoading$;
    }

    protected toggleContentType(contentType: MatchContentType): void {
        this.content.toggleContentType(contentType);
    }
}
