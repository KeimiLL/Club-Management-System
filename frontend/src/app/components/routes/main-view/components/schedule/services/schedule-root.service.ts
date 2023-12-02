import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { filter, forkJoin, map, Observable, of, switchMap, tap } from "rxjs";

import { MatchEventHttpService } from "../../../../../../shared/api/match-event-http.service";
import { MatchesHttpService } from "../../../../../../shared/api/matches-http.service";
import {
    Match,
    MatchCreate,
    MatchState,
    TableMatch,
} from "../../../../../../shared/models/match.model";
import { MatchEventCreate } from "../../../../../../shared/models/match-event.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { MatchEventPopupComponent } from "../components/schedule-content/components/match-events/components/match-event-popup/match-event-popup.component";
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
        private readonly httpEvents: MatchEventHttpService,
        private readonly dropdown: DropdownViewManagerService,
        private readonly table: TableService<TableMatch>,
        private readonly httpMatches: MatchesHttpService,
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
            this.httpMatches.getMatchesByTeamId(
                id,
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }

    private refreshCurrentMatch$(id: number): Observable<Match | null> {
        return this.splitView.refreshCurrentItem$(
            this.httpMatches.getMatchById(id)
        );
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
                this.httpMatches.deleteMatchById(this.splitView.currentId)
            )
            .pipe(
                switchMap(() => {
                    if (this.dropdown.currentTeam === null) return of(null);
                    return this.refreshMatches$(this.dropdown.currentTeam.id);
                })
            )
            .subscribe();
    }

    public openAddEventPopup(): void {
        const matchId = this.splitView.currentId;

        if (matchId === null) return;
        this.dialog
            .open(MatchEventPopupComponent, {
                width: "40vw",
                disableClose: true,
                data: matchId,
            })
            .afterClosed()
            .pipe(
                switchMap((event: MatchEventCreate | false) => {
                    if (event === false) return of(null);

                    return this.httpEvents.postMatchEventToMatch(event);
                }),
                switchMap(() => this.refreshCurrentMatch$(matchId))
            )
            .subscribe();
    }

    public changeMatchState(hasStarted: boolean, hasEnded: boolean): void {
        const matchId = this.splitView.currentId;

        if (hasEnded) return;
        if (matchId === null) return;

        const state: MatchState = hasStarted
            ? MatchState.End
            : MatchState.Start;

        this.httpMatches
            .changeMatchState(matchId, state)
            .pipe(tap(() => this.refreshCurrentMatch$(matchId)))
            .subscribe();
    }
}
