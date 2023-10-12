import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BackendResponse } from "../../../../../../../../shared/models/misc.model";
import { CreateCoach } from "./../../../../../../../../shared/models/coach.model";

@Injectable()
export class ModifyUsersHttpService {
    constructor(private readonly http: HttpClient) {}

    public createCoach(coachData: CreateCoach): Observable<BackendResponse> {
        return this.http.put<BackendResponse>("api/v1/coaches/", {
            coachData,
        });
    }
}
