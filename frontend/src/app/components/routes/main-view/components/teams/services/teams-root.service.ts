import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, of, switchMap } from "rxjs";

import { TeamsHttpService } from "../../../../../../shared/api/teams-http.service";
import { TableTeam, Team } from "../../../../../../shared/models/team.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { TeamsPopupComponent } from "../components/teams-popup/teams-popup.component";

@Injectable()
export class TeamsRootService extends DestroyClass {
    constructor(
        private readonly http: TeamsHttpService,
        private readonly dialog: MatDialog,
        private readonly table: TableService<TableTeam>,
        private readonly splitView: SplitViewManagerService<Team>
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.table.currentPageIndex$
            .pipe(
                switchMap(() => this.refreshTeams$()),
                this.untilDestroyed()
            )
            .subscribe();

        this.splitView.currentId$
            .pipe(
                switchMap((id: number | null) => this.refreshCurrentTeam$(id)),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private refreshTeams$(): Observable<TableTeam[]> {
        return this.table.refreshTableItems$(
            this.http.getTeamsList(
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }

    private refreshCurrentTeam$(id: number | null): Observable<Team | null> {
        if (id === null) return of(null);
        return this.splitView.refreshCurrentItem$(this.http.getTeamById(id));
    }

    public openNewMeetingDialog(): void {
        this.openDialog(null)
            .afterClosed()
            .pipe(
                switchMap((result: boolean) => {
                    if (result) return this.refreshTeams$();
                    return of(null);
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    // public openeditMeeting$Dialog(): void {
    //     this.openDialog(this.splitView.currentItem)
    //         .afterClosed()
    //         .pipe(
    //             filter((result) => result === true),
    //             switchMap((result: boolean) => {
    //                 if (result) {
    //                     return forkJoin([
    //                         this.refreshMeetings$(),
    //                         this.refreshCurrentMeeting$(
    //                             this.splitView.currentId
    //                         ),
    //                     ]).pipe(catchError(() => of(null)));
    //                 }
    //                 return of(null);
    //             }),
    //             this.untilDestroyed()
    //         )
    //         .subscribe();
    // }

    private openDialog(
        dialogData: Team | null
    ): MatDialogRef<TeamsPopupComponent> {
        return this.dialog.open(TeamsPopupComponent, {
            width: "50vw",
            disableClose: true,
            data: dialogData,
        });
    }
}
