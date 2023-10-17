import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Meeting, NewMeeting, TableMeeting } from "../models/meetings.model";
import { TableResponse } from "../models/misc.model";
import { BackendResponse } from "./../models/misc.model";

@Injectable({
    providedIn: "root",
})
export class MeetingsHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMeeting(meeting: NewMeeting): Observable<BackendResponse> {
        return this.http.post<BackendResponse>("api/v1/meetings", meeting);
    }

    public editMeeting(meeting: NewMeeting, id: number): Observable<Meeting> {
        return this.http.put<Meeting>(`api/v1/meetings/${id}`, meeting);
    }

    public getMeetingsList(
        page: number,
        capacity: number
    ): Observable<TableResponse<TableMeeting>> {
        return this.http.get<TableResponse<TableMeeting>>(
            `api/v1/meetings?page=${page}&per_page=${capacity}`
        );
    }

    public getMeetingById(id: number): Observable<Meeting> {
        return this.http.get<Meeting>(`api/v1/meetings/${id}`);
    }
}
