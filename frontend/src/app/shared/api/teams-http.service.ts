import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse, Dto, TableResponse } from "../models/misc.model";
import { TableTeam, TeamCreate } from "../models/team.model";

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

    public getAllTeams(): Observable<Dto[]> {
        return this.http.get<Dto[]>("/api/v1/teams/all");
    }
}
