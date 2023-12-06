import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
    Match,
    MatchCreate,
    MatchScoreGoals,
    TableMatch,
} from "../models/match.model";
import { BackendResponse, TableResponse } from "../models/misc.model";
import { MatchState } from "./../models/match.model";

@Injectable({
    providedIn: "root",
})
export class MatchesHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMatch(match: MatchCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/matches", match);
    }

    public getMatchesByTeamId(
        teamId: number,
        page: number,
        capacity: number
    ): Observable<TableResponse<TableMatch>> {
        return this.http.get<TableResponse<TableMatch>>(
            `api/v1/matches?team_id=${teamId}&page=${page}&per_page=${capacity}`
        );
    }

    public getMatchById(matchId: number): Observable<Match> {
        return this.http.get<Match>(`api/v1/matches/${matchId}`);
    }

    public deleteMatchById(matchId: number): Observable<BackendResponse> {
        return this.http.delete<BackendResponse>(`api/v1/matches/${matchId}`);
    }

    public changeMatchState(
        matchId: number,
        state: MatchState
    ): Observable<Match> {
        return this.http.post<Match>(
            `api/v1/matches/${matchId}/event/${state}`,
            {}
        );
    }

    public updateMatchScore(
        matchId: number,
        matchScore: MatchScoreGoals
    ): Observable<MatchScoreGoals> {
        return this.http.post<MatchScoreGoals>(
            `api/v1/matches/${matchId}/score`,
            matchScore
        );
    }
}
