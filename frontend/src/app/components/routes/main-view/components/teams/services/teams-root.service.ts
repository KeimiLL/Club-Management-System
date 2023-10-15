import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, switchMap } from "rxjs";

import { TableTeam, Team } from "../../../../../../shared/models/team.model";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { TeamsHttpService } from "./teams-http.service";

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

        // this.splitView.currentId$
        //     .pipe(
        //         switchMap((id: number | null) => this.refreshCurrentTeam$(id)),
        //         this.untilDestroyed()
        //     )
        //     .subscribe();
    }

    private refreshTeams$(): Observable<TableTeam[]> {
        return this.table.refreshTableItems$(
            this.http.getTeamsList(
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }

    // private refreshCurrentTeam$(id: number | null): Observable<Team | null> {
    //     if (id === null) return of(null);
    //     return this.splitView.refreshCurrentItem$(this.http.getTeamById(id));
    // }
}
