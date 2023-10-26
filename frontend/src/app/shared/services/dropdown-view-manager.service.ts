import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";

import { TeamsHttpService } from "../api/teams-http.service";
import { MainRoutes } from "../models/misc.model";
import { ShortTeam } from "../models/team.model";
import { DestroyClass } from "../utils/destroyClass";

@Injectable()
export class DropdownViewManagerService extends DestroyClass {
    private readonly teamsStore$ = new BehaviorSubject<ShortTeam[]>([]);
    private readonly teamIdStore$ = new BehaviorSubject<number | null>(null);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly httpTeams: TeamsHttpService
    ) {
        super();
        this.urlChecker();
    }

    private set teamId(teamId: number | null) {
        this.teamIdStore$.next(teamId);
    }

    public get teamId(): number | null {
        return this.teamIdStore$.value;
    }

    public get teamId$(): Observable<number | null> {
        return this.teamIdStore$.asObservable();
    }

    private set teams(teams: ShortTeam[]) {
        this.teamsStore$.next(teams);
    }

    public get teams(): ShortTeam[] {
        return this.teamsStore$.value;
    }

    public get teams$(): Observable<ShortTeam[]> {
        return this.teamsStore$.asObservable();
    }

    private initTeams$(id: null | number): Observable<ShortTeam[] | null> {
        return this.httpTeams.getAllTeams().pipe(
            tap((teams) => {
                this.teams = teams;
                if (teams.length > 0) {
                    if (id === null) {
                        this.teamId = teams[0].id;
                        this.addParamsToRouting(this.teamId);
                    } else if (
                        teams.find((team) => team.id === id) === undefined
                    ) {
                        this.router.navigate([MainRoutes.Error]);
                    } else {
                        this.teamId = id;
                        this.addParamsToRouting(this.teamId);
                    }
                }
            })
        );
    }

    private urlChecker(): void {
        this.activatedRoute.queryParams
            .pipe(
                switchMap((params) => {
                    if ("teamId" in params) {
                        const { teamId } = params;
                        return this.initTeams$(Number(teamId));
                    }
                    return this.initTeams$(null);
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }

    private addParamsToRouting(teamId: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                teamId,
            },
            queryParamsHandling: "merge",
        });
    }

    public changeTeamId(teamId: number): void {
        this.addParamsToRouting(teamId);
        this.teamId = teamId;
    }
}
