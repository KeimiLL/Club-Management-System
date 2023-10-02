import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import {
    LongMeeting,
    ShortMeeting,
} from "../../../../../../shared/models/meetings.model";
import { TableService } from "../../../../../../shared/services/table.service";
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
        private readonly table: TableService<LongMeeting>
    ) {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() =>
                    this.table.getCurrentPage(
                        this.http.getMeetingsList(
                            this.table.currentPageIndex,
                            this.table.capacity
                        )
                    )
                )
            )
            .subscribe((meetings) => {
                this.longMeetings = meetings;
            });
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
