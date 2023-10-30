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
    private readonly currentTeamStore$ = new BehaviorSubject<ShortTeam | null>(
        null
    );

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly httpTeams: TeamsHttpService
    ) {
        super();
        this.urlChecker();
    }

    private set currentTeam(team: ShortTeam | null) {
        this.currentTeamStore$.next(team);
    }

    public get currentTeam(): ShortTeam | null {
        return this.currentTeamStore$.value;
    }

    public get currentTeam$(): Observable<ShortTeam | null> {
        return this.currentTeamStore$.asObservable();
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
                        [this.currentTeam] = teams;
                    } else {
                        const selectedTeam = teams.find(
                            (team) => team.id === id
                        );

                        if (selectedTeam === undefined) {
                            this.router.navigate([MainRoutes.Error]);
                        } else {
                            this.currentTeam = selectedTeam;
                        }
                    }

                    this.addParamsToRouting(this.currentTeam?.id);
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

    private addParamsToRouting(teamId: number | undefined): void {
        if (teamId === undefined) return;
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                teamId,
            },
            queryParamsHandling: "merge",
        });
    }

    public changeTeam(team: ShortTeam): void {
        this.addParamsToRouting(team.id);
        this.currentTeam = team;
    }
}
