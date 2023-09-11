import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../../shared/models/meetings.model";
import { MeetingsHttpService } from "./meetings-http.service";

@Injectable()
export class MeetingsRootService {
    private readonly longMeetingsStore$ = new BehaviorSubject<LongMeeting[]>(
        []
    );

    private readonly shortMeetingsStore$ = new BehaviorSubject<ShortMeeting[]>(
        []
    );

    constructor(private readonly http: MeetingsHttpService) {
        http.getMeetingsList()
            .pipe(
                tap((meetings: LongMeeting[]) => {
                    this.longMeetings = meetings;
                    this.minimazeLongMeetings();
                })
            )
            .subscribe();
    }

    private set longMeetings(longMeetings: LongMeeting[]) {
        this.longMeetingsStore$.next(longMeetings);
    }

    public get longMeetings(): LongMeeting[] {
        return this.longMeetingsStore$.value;
    }

    public get longMeetings$(): Observable<LongMeeting[]> {
        return this.longMeetingsStore$.asObservable();
    }

    private set shortMeetings(shortMeetings: ShortMeeting[]) {
        this.shortMeetingsStore$.next(shortMeetings);
    }

    public get shortMeetings(): ShortMeeting[] {
        return this.shortMeetingsStore$.value;
    }

    public get shortMeetings$(): Observable<ShortMeeting[]> {
        return this.shortMeetingsStore$.asObservable();
    }

    private minimazeLongMeetings(): void {
        this.shortMeetings = this.longMeetings.map((meeting) => {
            const { name, isYour } = meeting;
            return { name, isYour } as ShortMeeting;
        });
    }
}
