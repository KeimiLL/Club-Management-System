import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Match, MatchCreate, TableMatch } from "../models/match.model";
import { BackendResponse, TableResponse } from "../models/misc.model";

@Injectable({
    providedIn: "root",
})
export class MatchesHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMatch(match: MatchCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/matches", match);
    }

    public getMatchesByTeamId(
        id: number,
        page: number,
        capacity: number
    ): Observable<TableResponse<TableMatch>> {
        return this.http.get<TableResponse<TableMatch>>(
            `api/v1/matches?team_id=${id}&page=${page}&per_page=${capacity}`
        );
    }

    public getMatchById(id: number): Observable<Match> {
        return this.http.get<Match>(`api/v1/matches/${id}`);
    }
}
