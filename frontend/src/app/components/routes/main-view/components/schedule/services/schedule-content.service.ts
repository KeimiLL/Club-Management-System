import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable, of, switchMap, tap } from "rxjs";

import { MatchEventHttpService } from "../../../../../../shared/api/match-event-http.service";
import { MatchContentType } from "../../../../../../shared/models/match.model";
import {
    MatchEvent,
    MatchEventCreate,
} from "../../../../../../shared/models/match-event.model";
import { MatchEventPopupComponent } from "../components/schedule-content/components/match-events/components/match-event-popup/match-event-popup.component";
import { Match } from "./../../../../../../shared/models/match.model";
import { SplitViewManagerService } from "./../../../../../../shared/services/split-view-manager.service";

@Injectable()
export class ScheduleContentService {
    private readonly contentTypeStore$ = new BehaviorSubject<MatchContentType>(
        MatchContentType.Details
    );

    private readonly eventsStore$ = new BehaviorSubject<MatchEvent[]>([]);

    constructor(
        private readonly httpEvents: MatchEventHttpService,
        private readonly dialog: MatDialog,
        private readonly splitView: SplitViewManagerService<Match>
    ) {}

    private set contentType(contentType: MatchContentType) {
        this.contentTypeStore$.next(contentType);
    }

    public get contentType$(): Observable<MatchContentType> {
        return this.contentTypeStore$.asObservable();
    }

    public toggleContentType(contentType: MatchContentType): void {
        this.contentType = contentType;
    }

    public set events(matchEvents: MatchEvent[]) {
        this.eventsStore$.next(matchEvents);
    }

    public get events$(): Observable<MatchEvent[]> {
        return this.eventsStore$.asObservable();
    }

    public getMatchEvents$(matchId: number): Observable<MatchEvent[]> {
        return this.httpEvents.getAllMatchEventsByMatchId(matchId).pipe(
            tap((matchEvents) => {
                this.events = matchEvents;
            })
        );
    }

    public openAddEventPopup(): void {
        if (this.splitView.currentId === null) return;
        this.dialog
            .open(MatchEventPopupComponent, {
                width: "40vw",
                disableClose: true,
                data: this.splitView.currentId,
            })
            .afterClosed()
            .pipe(
                switchMap((event: MatchEventCreate | false) => {
                    if (event === false) return of(null);

                    return this.httpEvents.postMatchEventToMatch(event);
                })
            )
            .subscribe();
    }

    public changeMatchState(): void {}
}
