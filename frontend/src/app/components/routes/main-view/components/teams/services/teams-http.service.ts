import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
    BackendResponse,
    TableResponse,
} from "../../../../../../shared/models/misc.model";
import {
    TableTeam,
    TeamCreate,
} from "../../../../../../shared/models/team.model";

@Injectable()
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
}
