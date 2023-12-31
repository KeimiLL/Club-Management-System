import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse, TableResponse } from "../models/misc.model";
import { ShortTeam, TableTeam, Team, TeamCreate } from "../models/team.model";

@Injectable({
    providedIn: "root",
})
export class TeamsHttpService {
    constructor(private readonly http: HttpClient) {}

    public createTeam(teamCreate: TeamCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("/api/v1/teams", teamCreate);
    }

    public getTeamsList(
        page: number,
        capacity: number
    ): Observable<TableResponse<TableTeam>> {
        return this.http.get<TableResponse<TableTeam>>(
            `api/v1/teams?page=${page}&per_page=${capacity}`
        );
    }

    public getAllTeams(): Observable<ShortTeam[]> {
        return this.http.get<ShortTeam[]>("/api/v1/teams/all");
    }

    public getTeamById(id: number): Observable<Team> {
        return this.http.get<Team>(`api/v1/teams/${id}`);
    }

    public deleteTeamById(id: number): Observable<BackendResponse> {
        return this.http.delete<BackendResponse>(`api/v1/teams/${id}`);
    }
}
