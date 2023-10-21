import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";

import { MeetingsHttpService } from "../../../../../../shared/api/meetings-http.service";
import { UserService } from "../../../../../../shared/api/user.service";
import {
    Meeting,
    TableMeeting,
} from "../../../../../../shared/models/meeting.model";
import {
    MeetingsPermission,
    RoleDefinitions,
} from "../../../../../../shared/models/permission.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { MeetingPopupComponent } from "../components/add-meeting-popup/meeting-popup.component";
import { longMeetingColumns, shortMeetingColumns } from "../meeting-table.data";

@Injectable()
export class MeetingsRootService extends DestroyClass {
    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly http: MeetingsHttpService,
        private readonly dialog: MatDialog,
        private readonly table: TableService<TableMeeting>,
        private readonly splitView: SplitViewManagerService<Meeting>,
        private readonly userService: UserService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() => this.refreshMeetings$()),
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
            map((value) => (value ? shortMeetingColumns : longMeetingColumns)),
            map((value) => {
                if (this.userService.currentUser === null) return value;
                const userRole = this.userService.currentUser.role;
                const rolePermissions = RoleDefinitions[userRole].permissions;
                const hasPermission = rolePermissions.includes(
                    MeetingsPermission.SeeAll
                );

                if (hasPermission) return value;
                return value.filter((column) => column !== "Your meeting");
            })
        );
    }

    public openNewMeetingDialog(): void {
        this.openDialog(null)
            .afterClosed()
            .pipe(
                switchMap((result: boolean) => {
                    if (result) return this.refreshMeetings$();
                    return of(null);
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
                switchMap((result: boolean) => {
                    if (result) {
                        return forkJoin([
                            this.refreshMeetings$(),
                            this.refreshCurrentMeeting$(
                                this.splitView.currentId
                            ),
                        ]).pipe(catchError(() => of(null)));
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

    private refreshMeetings$(): Observable<TableMeeting[]> {
        return this.table.refreshTableItems$(
            this.http.getMeetingsList(
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }

    private refreshCurrentMeeting$(
        id: number | null
    ): Observable<Meeting | null> {
        if (id === null) return of(null);
        return this.splitView.refreshCurrentItem$(this.http.getMeetingById(id));
    }
}
