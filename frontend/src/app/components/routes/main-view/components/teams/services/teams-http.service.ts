import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TableResponse } from "../../../../../../shared/models/misc.model";
import { TableTeam } from "../../../../../../shared/models/team.model";

@Injectable()
export class TeamsHttpService {
    constructor(private readonly http: HttpClient) {}

    public getTeamsList(
        page: number,
        capacity: number
    ): Observable<TableResponse<TableTeam>> {
        return this.http.get<TableResponse<TableTeam>>(
            `api/v1/teams?page=${page}&per_page=${capacity}`
        );
    }
}
