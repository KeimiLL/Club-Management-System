import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { TeamsHttpService } from "../api/teams-http.service";
import { ShortTeam } from "../models/team.model";
import { DestroyClass } from "../utils/destroyClass";

@Injectable()
export class DropdownViewManagerService extends DestroyClass {
    private readonly teamsStore$ = new BehaviorSubject<ShortTeam[]>([]);
    private readonly currentTeamIdStore$ = new BehaviorSubject<number | null>(
        null
    );

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly httpTeams: TeamsHttpService
    ) {
        super();
        this.initDropdown();
    }

    private set currentTeamId(teamId: number | null) {
        this.currentTeamIdStore$.next(teamId);
    }

    public get currentTeamId(): number | null {
        return this.currentTeamIdStore$.value;
    }

    public get currentTeamId$(): Observable<number | null> {
        return this.currentTeamIdStore$.asObservable();
    }

    public set teams(teams: ShortTeam[]) {
        this.teamsStore$.next(teams);
    }

    public get teams$(): Observable<ShortTeam[]> {
        return this.teamsStore$.asObservable();
    }

    private initDropdown(): void {
        this.httpTeams
            .getAllTeams()
            .pipe(
                tap((teams) => {
                    this.teams = teams;
                    this.currentTeamId = teams[0].id;
                    this.addParamsToRouting(this.currentTeamId);
                })
            )
            .subscribe(() => {
                this.urlChecker();
            });
    }

    private urlChecker(): void {
        this.activatedRoute.queryParams
            .pipe(
                tap((params) => {
                    if ("teamId" in params) {
                        const { teamId } = params;
                        this.currentTeamId = teamId;
                    } else {
                        this.initDropdown();
                    }
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
        this.currentTeamId = teamId;
    }
}
