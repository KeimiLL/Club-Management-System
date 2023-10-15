import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ShortCoach } from "../../../../../../../../shared/models/coach.model";
import { BackendResponse } from "../../../../../../../../shared/models/misc.model";
import { TeamCreate } from "../../../../../../../../shared/models/team.model";

@Injectable()
export class TeamsPopupHttpService {
    constructor(private readonly http: HttpClient) {}

    public createTeam(teamCreate: TeamCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("/api/v1/teams", teamCreate);
    }

    public getAllCoaches(): Observable<ShortCoach[]> {
        return this.http.get<ShortCoach[]>("/api/v1/coaches/all");
    }
}
