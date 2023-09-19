import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
    AddMeeting,
    MeetingResponse,
} from "../../../../../../../../shared/models/meetings.model";

@Injectable({
    providedIn: "root",
})
export class MeetingsPopupHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMeeting(meeting: AddMeeting): Observable<MeetingResponse> {
        return this.http.post<MeetingResponse>("api/v1/meetings", meeting);
    }
}
