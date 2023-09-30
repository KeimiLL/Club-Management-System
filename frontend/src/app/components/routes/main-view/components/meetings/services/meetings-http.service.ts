import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MeetingResponse } from "../../../../../../shared/models/meetings.model";

@Injectable()
export class MeetingsHttpService {
    constructor(private readonly http: HttpClient) {}

    public getMeetingsList(
        pageIndex: number,
        pageCapacity: number
    ): Observable<MeetingResponse> {
        return this.http.get<MeetingResponse>(
            `api/v1/meetings?page=${pageIndex}&per_page=${pageCapacity}`
        );
    }
}
