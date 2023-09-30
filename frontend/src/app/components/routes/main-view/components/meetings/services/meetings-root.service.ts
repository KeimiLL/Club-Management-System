import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { longMeetingsMockup } from "../../../../../../shared/mock/meetings.mock";
import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../../shared/models/meetings.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { MeetingsHttpService } from "./meetings-http.service";

@Injectable()
export class MeetingsRootService {
    private readonly longMeetingsStore$ = new BehaviorSubject<LongMeeting[]>(
        []
    );

    private readonly shortMeetingsStore$ = new BehaviorSubject<ShortMeeting[]>(
        []
    );

    constructor(
        private readonly http: MeetingsHttpService,
        private readonly splitView: SplitViewManagerService
    ) {
        this.longMeetings = longMeetingsMockup;
        http.getMeetingsList(
            this.splitView.PAGE_INDEX,
            this.splitView.PAGE_CAPACITY
        )
            .pipe(
                tap((meetings) => {
                    console.log(this.splitView.TOTAL_ITEMS);
                    console.log(meetings);
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
            const { id, name, isYour } = meeting;
            return { id, name, isYour } as ShortMeeting;
        });
    }
}
