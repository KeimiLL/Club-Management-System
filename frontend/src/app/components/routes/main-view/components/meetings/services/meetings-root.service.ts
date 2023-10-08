import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import {
    LongMeeting,
    Meeting,
    ShortMeeting,
} from "../../../../../../shared/models/meetings.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { MeetingPopupComponent } from "../components/add-meeting-popup/meeting-popup.component";
import { longMeetingColumns, shortMeetingColumns } from "../meeting-table.data";
import { MeetingsHttpService } from "./meetings-http.service";

@Injectable()
export class MeetingsRootService extends DestroyClass {
    private readonly longMeetingsStore$ = new BehaviorSubject<LongMeeting[]>(
        []
    );

    private readonly shortMeetingsStore$ = new BehaviorSubject<ShortMeeting[]>(
        []
    );

    private readonly currentMeetingStore$ = new BehaviorSubject<Meeting | null>(
        null
    );

    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly http: MeetingsHttpService,
        private readonly dialog: MatDialog,
        private readonly table: TableService<LongMeeting>,
        private readonly splitView: SplitViewManagerService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() => this.refreshMeetings()),
                this.untilDestroyed()
            )
            .subscribe();

        this.splitView.currentId$
            .pipe(
                switchMap((id: number | null) => {
                    if (id !== null) {
                        return this.getCurrentMeetingById(id).pipe(
                            catchError((error) => {
                                if (error.status === 404) {
                                    this.splitView.changeDetailState();
                                    return of(null);
                                }
                                return of(null);
                            })
                        );
                    }
                    return of(null);
                }),
                tap((meeting) => {
                    this.currentMeeting = meeting;
                }),
                this.untilDestroyed()
            )
            .subscribe();

        this.displayedColumns$ = this.splitView.isDetail$.pipe(
            map((value) => (value ? shortMeetingColumns : longMeetingColumns))
        );
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

    public set currentMeeting(meeting: Meeting | null) {
        this.currentMeetingStore$.next(meeting);
    }

    public get currentMeeting(): Meeting | null {
        return this.currentMeetingStore$.value;
    }

    public get currentMeeting$(): Observable<Meeting | null> {
        return this.currentMeetingStore$.asObservable();
    }

    public openDialog(): void {
        const dialog = this.dialog.open(MeetingPopupComponent, {
            width: "50vw",
            disableClose: true,
        });

        dialog
            .afterClosed()
            .pipe(
                switchMap(() => this.refreshMeetings()),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private refreshMeetings(): Observable<LongMeeting[]> {
        return this.table
            .getCurrentPage(
                this.http.getMeetingsList(
                    this.table.currentPageIndex,
                    this.table.capacity
                )
            )
            .pipe(
                tap((meetings) => {
                    this.longMeetings = meetings;
                    this.minimizeLongMeetings();
                })
            );
    }

    private minimizeLongMeetings(): void {
        this.shortMeetings = this.longMeetings.map((meeting) => {
            const { id, name, is_yours } = meeting;
            return { id, name, is_yours } as ShortMeeting;
        });
    }

    private getCurrentMeetingById(id: number): Observable<Meeting> {
        return this.http.getMeetingsById(id);
    }
}
