import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { filter, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";

import { MatchesHttpService } from "../../../../../../shared/api/matches-http.service";
import {
    Match,
    MatchCreate,
    TableMatch,
} from "../../../../../../shared/models/match.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { SchedulePopupComponent } from "../components/schedule-popup/schedule-popup.component";
import {
    longMatchesColumns,
    shortMatchesColumns,
} from "../schedule-table.data";
import { ScheduleContentService } from "./schedule-content.service";

@Injectable()
export class ScheduleRootService extends DestroyClass {
    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly dialog: MatDialog,
        private readonly dropdown: DropdownViewManagerService,
        private readonly table: TableService<TableMatch>,
        private readonly http: MatchesHttpService,
        private readonly splitView: SplitViewManagerService<Match>,
        private readonly content: ScheduleContentService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.dropdown.currentTeam$
            .pipe(
                filter(Boolean),
                map((team) => team.id),
                tap(() => {
                    this.table.changePage(0);
                }),
                this.untilDestroyed()
            )
            .subscribe();

        this.splitView.currentId$
            .pipe(
                filter(Boolean),
                switchMap((id: number) =>
                    forkJoin([
                        this.refreshCurrentMatch$(id),
                        this.content.getMatchEvents$(id),
                    ])
                ),
                tap(([match, events]) => (this.content.events = events)),
                this.untilDestroyed()
            )
            .subscribe();

        this.table.currentPageIndex$
            .pipe(
                map(() => this.dropdown.currentTeam),
                filter(Boolean),
                map((team) => team.id),
                switchMap((id) => this.refreshMatches$(id)),
                this.untilDestroyed()
            )
            .subscribe();

        this.displayedColumns$ = this.splitView.isDetail$.pipe(
            map((value) => (value ? shortMatchesColumns : longMatchesColumns))
        );
    }

    public openNewMatchDialog(): void {
        this.openDialog(null)
            .afterClosed()
            .pipe(
                filter(Boolean),
                switchMap((result: MatchCreate) =>
                    this.refreshMatches$(result.match.team_id)
                ),
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

    private refreshMatches$(id: number): Observable<TableMatch[]> {
        return this.table.refreshTableItems$(
            this.http.getMatchesByTeamId(
                id,
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }

    private refreshCurrentMatch$(id: number): Observable<Match | null> {
        return this.splitView.refreshCurrentItem$(this.http.getMatchById(id));
    }

    private openDialog(
        dialogData: Match | null
    ): MatDialogRef<SchedulePopupComponent> {
        return this.dialog.open(SchedulePopupComponent, {
            width: "50vw",
            disableClose: true,
            data: { data: dialogData, teamId: this.dropdown.currentTeam?.id },
        });
    }

    public deleteCurrentMatch(): void {
        if (this.splitView.currentId === null) return;

        this.splitView
            .deleteCurrentItem$(
                this.http.deleteMatchById(this.splitView.currentId)
            )
            .pipe(
                switchMap(() => {
                    if (this.dropdown.currentTeam === null) return of(null);
                    return this.refreshMatches$(this.dropdown.currentTeam.id);
                })
            )
            .subscribe();
    }
}
