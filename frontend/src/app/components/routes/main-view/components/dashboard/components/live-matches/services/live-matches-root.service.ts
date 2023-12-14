import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { MatchEventHttpService } from "../../../../../../../../shared/api/match-event-http.service";
import { MatchesHttpService } from "../../../../../../../../shared/api/matches-http.service";
import { LiveMatch } from "../../../../../../../../shared/models/match.model";

@Injectable()
export class LiveMatchesRootService {
    private readonly liveMatchesStore$ = new BehaviorSubject<LiveMatch[]>([]);
    private readonly limit = 3;

    public get liveMatches$(): Observable<LiveMatch[]> {
        return this.liveMatchesStore$.asObservable();
    }

    private set liveMatches(matches: LiveMatch[]) {
        this.liveMatchesStore$.next(matches);
    }

    constructor(
        private readonly httpMatches: MatchesHttpService,
        private readonly httpEvents: MatchEventHttpService
    ) {
        this.initData();
    }

    private initData(): void {
        this.httpMatches
            .getLiveMatches(this.limit)
            .pipe(tap((matches) => (this.liveMatches = matches)))
            .subscribe();
    }
}
