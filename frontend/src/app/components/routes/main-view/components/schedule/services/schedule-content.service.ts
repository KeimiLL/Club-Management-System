import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { MatchEventHttpService } from "../../../../../../shared/api/match-event-http.service";
import { MatchContentType } from "../../../../../../shared/models/match.model";
import { MatchEvent } from "../../../../../../shared/models/match-event.model";

@Injectable()
export class ScheduleContentService {
    private readonly contentTypeStore$ = new BehaviorSubject<MatchContentType>(
        MatchContentType.Details
    );

    private readonly eventsStore$ = new BehaviorSubject<MatchEvent[]>([]);

    constructor(private readonly httpEvents: MatchEventHttpService) {}

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
}
