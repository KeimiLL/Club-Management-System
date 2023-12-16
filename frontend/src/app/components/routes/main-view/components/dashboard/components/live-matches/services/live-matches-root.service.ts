import { Injectable } from "@angular/core";
import {
    BehaviorSubject,
    forkJoin,
    mergeMap,
    Observable,
    tap,
    timer,
} from "rxjs";

import { MatchEventHttpService } from "../../../../../../../../shared/api/match-event-http.service";
import { MatchesHttpService } from "../../../../../../../../shared/api/matches-http.service";
import { LiveMatch } from "../../../../../../../../shared/models/match.model";
import { MatchEvent } from "../../../../../../../../shared/models/match-event.model";
import { DestroyClass } from "../../../../../../../../shared/utils/destroyClass";

@Injectable()
export class LiveMatchesRootService extends DestroyClass {
    private readonly liveMatchesStore$ = new BehaviorSubject<LiveMatch[]>([]);
    private readonly liveMatchesEventsStore$ = new BehaviorSubject<
        MatchEvent[][]
    >([]);

    private readonly limit = 3;

    public get liveMatches$(): Observable<LiveMatch[]> {
        return this.liveMatchesStore$.asObservable();
    }

    private set liveMatches(matches: LiveMatch[]) {
        this.liveMatchesStore$.next(matches);
    }

    public get liveMatchesEvents$(): Observable<MatchEvent[][]> {
        return this.liveMatchesEventsStore$.asObservable();
    }

    private set liveMatchesEvents(events: MatchEvent[][]) {
        this.liveMatchesEventsStore$.next(events);
    }

    constructor(
        private readonly httpMatches: MatchesHttpService,
        private readonly httpEvents: MatchEventHttpService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        timer(0, 10000)
            .pipe(
                mergeMap(() =>
                    this.httpMatches
                        .getLiveMatches(this.limit)
                        .pipe(tap((matches) => (this.liveMatches = matches)))
                ),
                this.untilDestroyed()
            )
            .subscribe();

        this.liveMatches$
            .pipe(
                mergeMap((matches) => {
                    const matchesCalls: Array<Observable<MatchEvent[]>> = [];
                    matches.forEach((match) =>
                        matchesCalls.push(
                            this.getMatchEventsByMatchId$(match.id)
                        )
                    );
                    return forkJoin(matchesCalls);
                }),
                tap((matchesEvents) => {
                    this.liveMatchesEvents = matchesEvents;
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    public getMatchEventsByMatchId$(matchId: number): Observable<MatchEvent[]> {
        return this.httpEvents.getAllMatchEventsByMatchId(matchId);
    }
}
