import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";

import { MatchEventHttpService } from "../../../../../../shared/api/match-event-http.service";
import { MatchesHttpService } from "../../../../../../shared/api/matches-http.service";
import {
    Match,
    MatchContentType,
    MatchScoreGoals,
} from "../../../../../../shared/models/match.model";
import {
    MatchEvent,
    MatchEventCreate,
} from "../../../../../../shared/models/match-event.model";

@Injectable()
export class ScheduleContentService {
    private readonly contentTypeStore$ = new BehaviorSubject<MatchContentType>(
        MatchContentType.Details
    );

    private readonly eventsStore$ = new BehaviorSubject<MatchEvent[]>([]);

    constructor(
        private readonly httpEvents: MatchEventHttpService,
        private readonly httpMatches: MatchesHttpService
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

    public postScoreUpdateEvent(
        event: MatchEventCreate,
        currentMatch: Match
    ): Observable<unknown> {
        const goalsScored =
            (currentMatch.goals_scored ?? 0) + (event.is_own_event ? 1 : 0);
        const goalsConceded =
            (currentMatch.goals_conceded ?? 0) + (event.is_own_event ? 0 : 1);

        const matchScore: MatchScoreGoals = {
            goals_conceded: goalsConceded,
            goals_scored: goalsScored,
        };

        return this.httpEvents
            .postMatchEventToMatch(event)
            .pipe(
                switchMap(() =>
                    this.httpMatches.updateMatchScore(
                        currentMatch.id,
                        matchScore
                    )
                )
            );
    }
}
