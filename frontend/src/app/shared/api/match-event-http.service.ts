import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MatchEvent, MatchEventCreate } from "../models/match-event.model";
import { BackendResponse } from "../models/misc.model";

@Injectable({
    providedIn: "root",
})
export class MatchEventHttpService {
    constructor(private readonly http: HttpClient) {}

    public postMatchEventToMatch(
        event: MatchEventCreate
    ): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("/api/v1/matchevents", event);
    }

    public getAllMatchEventsByMatchId(
        matchId: number
    ): Observable<MatchEvent[]> {
        return this.http.get<MatchEvent[]>(
            `/api/v1/matchevents?match_id=${matchId}`
        );
    }
}
