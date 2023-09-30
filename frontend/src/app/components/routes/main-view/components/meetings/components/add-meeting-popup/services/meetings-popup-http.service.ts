import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
    Meeting,
    NewMeeting,
} from "../../../../../../../../shared/models/meetings.model";

@Injectable()
export class MeetingsPopupHttpService {
    constructor(private readonly http: HttpClient) {}

    public postNewMeeting(meeting: NewMeeting): Observable<Meeting> {
        return this.http.post<Meeting>("api/v1/meetings", meeting);
    }
}
