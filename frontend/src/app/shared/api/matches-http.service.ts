import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MatchCreate } from "../models/match.model";
import { BackendResponse } from "../models/misc.model";

@Injectable({
    providedIn: "root",
})
export class MatchesHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMatch(match: MatchCreate): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/matches", match);
    }
}
