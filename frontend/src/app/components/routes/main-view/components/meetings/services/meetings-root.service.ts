import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

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
    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly http: MeetingsHttpService,
        private readonly dialog: MatDialog,
        private readonly table: TableService<TableMeeting>,
        private readonly splitView: SplitViewManagerService<Meeting>
    ) {
        super();
        this.initData();
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
                tap((id: number | null) => {
                    this.refreshCurrentMeeting(id);
                }),
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
                tap((result: boolean) => {
                    if (result) this.refreshMeetings();
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    public openEditMeetingDialog(): void {
        this.openDialog(this.splitView.currentItem)
            .afterClosed()
            .pipe(
                filter((result) => result === true),
                tap((result: boolean) => {
                    if (result) {
                        this.refreshMeetings();
                        this.refreshCurrentMeeting(this.splitView.currentId);
                    }
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

    private refreshCurrentMeeting(id: number | null): void {
        if (id === null) return;
        this.splitView
            .refreshCurrentMeeting$(this.http.getMeetingsById(id))
            .subscribe();
    }
}
