import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";

import {
    Meeting,
    TableMeeting,
} from "../../../../../../shared/models/meetings.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { MeetingPopupComponent } from "../components/add-meeting-popup/meeting-popup.component";
import { longMeetingColumns, shortMeetingColumns } from "../meeting-table.data";
import { MeetingsHttpService } from "./meetings-http.service";

@Injectable()
export class MeetingsRootService extends DestroyClass {
    private readonly currentMeetingStore$ = new BehaviorSubject<Meeting | null>(
        null
    );

    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly http: MeetingsHttpService,
        private readonly dialog: MatDialog,
        private readonly table: TableService<TableMeeting>,
        private readonly splitView: SplitViewManagerService
    ) {
        super();
        this.initData();
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

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                tap(() => {
                    this.refreshMeetings();
                }),
                this.untilDestroyed()
            )
            .subscribe();

        this.splitView.currentId$
            .pipe(
                switchMap((id: number | null) =>
                    this.refreshCurrentMeeting$(id)
                ),
                this.untilDestroyed()
            )
            .subscribe();

        this.displayedColumns$ = this.splitView.isDetail$.pipe(
            map((value) => (value ? shortMeetingColumns : longMeetingColumns))
        );
    }

    public openNewMeetingDialog(): void {
        this.openDialog(null)
            .afterClosed()
            .pipe(
                switchMap((result: boolean) => {
                    if (result) this.refreshMeetings();
                    return of(null);
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    public openEditMeetingDialog(): void {
        this.openDialog(this.currentMeeting)
            .afterClosed()
            .pipe(
                filter((result) => result === true),
                switchMap((result: boolean) => {
                    if (result) {
                        this.refreshMeetings();
                        return this.refreshCurrentMeeting$(
                            this.splitView.currentId
                        ).pipe(catchError(() => of(null)));
                    }
                    return of(null);
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private openDialog(
        dialogData: Meeting | null
    ): MatDialogRef<MeetingPopupComponent> {
        return this.dialog.open(MeetingPopupComponent, {
            width: "50vw",
            disableClose: true,
            data: dialogData,
        });
    }

    private refreshMeetings(): void {
        this.table
            .refreshTableItems$(
                this.http.getMeetingsList(
                    this.table.currentPageIndex,
                    this.table.capacity
                )
            )
            .subscribe();
    }

    private refreshCurrentMeeting$(
        id: number | null
    ): Observable<Meeting | null> {
        if (id !== null) {
            return this.http.getMeetingsById(id).pipe(
                tap((meeting) => {
                    this.currentMeeting = meeting;
                }),
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
    }
}
