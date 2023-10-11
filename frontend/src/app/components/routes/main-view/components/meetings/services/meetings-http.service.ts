import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
    Meeting,
    TableMeeting,
} from "../../../../../../shared/models/meetings.model";
import { TableResponse } from "../../../../../../shared/models/misc.model";

@Injectable()
export class MeetingsHttpService {
    constructor(private readonly http: HttpClient) {}

    public getMeetingsList(
        page: number,
        capacity: number
    ): Observable<TableResponse<TableMeeting>> {
        return this.http.get<TableResponse<TableMeeting>>(
            `api/v1/meetings?page=${page}&per_page=${capacity}`
        );
    }

    public getMeetingsById(id: number): Observable<Meeting> {
        return this.http.get<Meeting>(`api/v1/meetings/${id}`);
    }
}
