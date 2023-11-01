import { Injectable } from "@angular/core";
import {
    BehaviorSubject,
    filter,
    forkJoin,
    map,
    Observable,
    of,
    switchMap,
    tap,
} from "rxjs";

import { CoachesHttpService } from "../../../../../../shared/api/coaches-http.service";
import { PlayersHttpService } from "../../../../../../shared/api/players-http.service";
import { CoachName } from "../../../../../../shared/models/coach.model";
import {
    Player,
    TablePlayer,
} from "../../../../../../shared/models/player.model";
import { DropdownViewManagerService } from "../../../../../../shared/services/dropdown-view-manager.service";
import { SplitViewManagerService } from "../../../../../../shared/services/split-view-manager.service";
import { TableService } from "../../../../../../shared/services/table.service";
import { DestroyClass } from "../../../../../../shared/utils/destroyClass";
import { longPlayerColumns, shortPlayerColumns } from "../squad-table.data";

@Injectable()
export class SquadRootService extends DestroyClass {
    private readonly teamCoachStore$ = new BehaviorSubject<CoachName | null>(
        null
    );

    public displayedColumns$: Observable<string[]>;

    constructor(
        private readonly httpCoach: CoachesHttpService,
        private readonly httpPlayer: PlayersHttpService,
        private readonly splitView: SplitViewManagerService<Player>,
        private readonly table: TableService<TablePlayer>,
        private readonly dropdown: DropdownViewManagerService
    ) {
        super();
        this.initData();
    }

    private initData(): void {
        this.dropdown.currentTeam$
            .pipe(
                tap(() => {
                    this.table.changePage(0);
                }),
                filter(Boolean),
                map((team) => team.id),
                switchMap((teamId) =>
                    forkJoin({
                        coach: this.refreshCoach$(teamId),
                        players: this.refreshPlayers$(teamId),
                    })
                ),
                this.untilDestroyed()
            )
            .subscribe();

        this.splitView.currentId$
            .pipe(
                switchMap((id: number | null) =>
                    this.refreshCurrentPlayer$(id)
                ),
                this.untilDestroyed()
            )
            .subscribe();

        this.table.currentPageIndex$
            .pipe(
                map(() => this.dropdown.currentTeam),
                filter(Boolean),
                map((team) => team.id),
                switchMap((id) => this.refreshPlayers$(id)),
                this.untilDestroyed()
            )
            .subscribe();

        this.displayedColumns$ = this.splitView.isDetail$.pipe(
            map((value) => (value ? shortPlayerColumns : longPlayerColumns))
        );
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

    private refreshCurrentPlayer$(
        id: number | null
    ): Observable<Player | null> {
        if (id === null) return of(null);
        return this.splitView.refreshCurrentItem$(
            this.httpPlayer.getPlayerById(id)
        );
    }
}
