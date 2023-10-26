import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from "rxjs";

import { CoachesHttpService } from "../../../../../../shared/api/coaches-http.service";
import { PlayersHttpService } from "../../../../../../shared/api/players-http.service";
import { CoachName } from "../../../../../../shared/models/coach.model";
import { TablePlayer } from "../../../../../../shared/models/player.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";

@Injectable()
export class SquadRootService extends DestroyClass {
    private readonly teamCoachStore$ = new BehaviorSubject<CoachName | null>(
        null
    );

    constructor(
        private readonly httpCoach: CoachesHttpService,
        private readonly httpPlayer: PlayersHttpService,
        private readonly table: TableService<TablePlayer>,
        private readonly dropdown: DropdownViewManagerService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.dropdown.teamId$
            .pipe(
                filter(Boolean),
                switchMap((teamId) => {
                    this.table.changePage(0);
                    return this.refreshCoach$(teamId);
                }),
                this.untilDestroyed()
            )
            .subscribe();

        this.table.currentPageIndex$
            .pipe(
                map(() => this.dropdown.teamId),
                filter(Boolean),
                switchMap((id) => this.refreshPlayers$(id)),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private set teamCoach(coach: null | CoachName) {
        this.teamCoachStore$.next(coach);
    }

    public get teamCoach$(): Observable<CoachName | null> {
        return this.teamCoachStore$.asObservable();
    }

    private refreshCoach$(teamId: number): Observable<CoachName> {
        return this.httpCoach
            .getCoachByTeamId(teamId)
            .pipe(tap((coach) => (this.teamCoach = coach)));
    }

    private refreshPlayers$(id: number): Observable<TablePlayer[]> {
        return this.table.refreshTableItems$(
            this.httpPlayer.getPlayersByTeamId(
                id,
                this.table.currentPageIndex,
                this.table.capacity
            )
        );
    }
}
