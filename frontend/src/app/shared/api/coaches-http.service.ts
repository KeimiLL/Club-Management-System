import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CoachName, CreateCoach, ShortCoach } from "../models/coach.model";
import { BackendResponse } from "../models/misc.model";

@Injectable({
    providedIn: "root",
})
export class CoachesHttpService {
    constructor(private readonly http: HttpClient) {}

    public getAllCoaches(): Observable<ShortCoach[]> {
        return this.http.get<ShortCoach[]>("/api/v1/coaches/all");
    }

    public createCoach(coachData: CreateCoach): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/coaches", coachData);
    }

    public getCoachByTeamId(teamId: number): Observable<CoachName> {
        return this.http.get<CoachName>(`/api/v1/coaches?team_id=${teamId}`);
    }

    public deleteCoachById(id: number): Observable<BackendResponse> {
        return this.http.delete<BackendResponse>(`api/v1/coaches/${id}`);
    }
}
