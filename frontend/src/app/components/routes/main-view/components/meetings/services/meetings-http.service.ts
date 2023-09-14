import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { longMeetingsMockup } from "../../../../../../shared/mock/meetings.mock";
import { LongMeeting } from "../../../../../../shared/models/meetings.model";

@Injectable()
export class MeetingsHttpService {
    constructor(private readonly http: HttpClient) {}

    public getMeetingsList(): Observable<LongMeeting[]> {
        return of(longMeetingsMockup);
    }

    public addMeeting(): Observable<null> {
        return of(null);
    }
}
