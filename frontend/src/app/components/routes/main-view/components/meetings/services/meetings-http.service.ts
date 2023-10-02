import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LongMeeting } from "../../../../../../shared/models/meetings.model";
import { TableResponse } from "../../../../../../shared/models/misc.model";

@Injectable()
export class MeetingsHttpService {
    constructor(private readonly http: HttpClient) {}

    public getMeetingsList(
        page: number,
        capacity: number
    ): Observable<TableResponse<LongMeeting>> {
        return this.http.get<TableResponse<LongMeeting>>(
            `api/v1/meetings?page=${page}&per_page=${capacity}`
        );
    }
}
