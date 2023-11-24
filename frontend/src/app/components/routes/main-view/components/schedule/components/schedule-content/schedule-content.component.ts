import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import {
    Match,
    MatchContentType,
} from "../../../../../../../shared/models/match.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { SplitViewManagerService } from "../../../../../../../shared/services/split-view-manager.service";
import { ScheduleContentService } from "../../services/schedule-content.service";
import { MatchDetailsComponent } from "./components/match-details/match-details.component";
import { MatchEventsComponent } from "./components/match-events/match-events.component";
import { MatchSquadComponent } from "./components/match-squad/match-squad.component";
import { ScoreComponent } from "./components/score/score.component";

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
    ],
    templateUrl: "./schedule-content.component.html",
    styleUrls: ["./schedule-content.component.scss"],
})
export class ScheduleContentComponent {
    @Input() public match: Match;

    // protected isCurrentMeetingLoading$: Observable<boolean>;
    // protected spinnerMessage = "Loading selected match...";

    protected readonly contentTypes = MatchContentType;
    protected readonly contentType$: Observable<MatchContentType>;

    constructor(
        private readonly content: ScheduleContentService,
        private readonly split: SplitViewManagerService<Match>
    ) {
        this.contentType$ = this.content.contentType$;
    }

    protected toggleContentType(contentType: MatchContentType): void {
        this.content.toggleContentType(contentType);
    }
}
