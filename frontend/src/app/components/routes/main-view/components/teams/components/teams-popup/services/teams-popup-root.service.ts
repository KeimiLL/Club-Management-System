import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { CoachesHttpService } from "../../../../../../../../shared/api/coaches-http.service";
import { PlayersHttpService } from "../../../../../../../../shared/api/players-http.service";
import { TeamsHttpService } from "../../../../../../../../shared/api/teams-http.service";
import { ShortCoach } from "../../../../../../../../shared/models/coach.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";
import { TeamCreate } from "../../../../../../../../shared/models/team.model";
import { TeamsPopupComponent } from "../teams-popup.component";
import { TeamsPopupFormsService } from "./teams-popup-forms.service";

@Injectable()
export class TeamsPopupRootService {
    private readonly coachesStore$ = new BehaviorSubject<ShortCoach[]>([]);
    private readonly allPlayersStore$ = new BehaviorSubject<ShortPlayer[]>([]);
    private readonly selectedPlayersStore$ = new BehaviorSubject<ShortPlayer[]>(
        []
    );

    public set coaches(coaches: ShortCoach[]) {
        this.coachesStore$.next(coaches);
    }

    public get coaches$(): Observable<ShortCoach[]> {
        return this.coachesStore$.asObservable();
    }

    public set allPlayers(players: ShortPlayer[]) {
        this.allPlayersStore$.next(players);
    }

    public get allPlayers$(): Observable<ShortPlayer[]> {
        return this.allPlayersStore$.asObservable();
    }

    public set selectedPlayers(players: ShortPlayer[]) {
        this.selectedPlayersStore$.next(players);
    }

    public get selectedPlayers(): ShortPlayer[] {
        return this.selectedPlayersStore$.value;
    }

    public get selectedPlayers$(): Observable<ShortPlayer[]> {
        return this.selectedPlayersStore$.asObservable();
    }

    constructor(
        private readonly httpTeams: TeamsHttpService,
        private readonly httpCoaches: CoachesHttpService,
        private readonly httpPlayers: PlayersHttpService,
        private readonly dialogRef: MatDialogRef<TeamsPopupComponent>,
        private readonly forms: TeamsPopupFormsService
    ) {
        this.initData();
    }

    private initData(): void {
        this.httpCoaches
            .getAllCoaches()
            .pipe(
                tap((coaches) => {
                    this.coaches = coaches;
                })
            )
            .subscribe();

        this.httpPlayers
            .getAllPlayers()
            .pipe(
                tap((players) => {
                    this.allPlayers = players;
                })
            )
            .subscribe();
    }

    public selectPlayer(player: ShortPlayer): void {
        this.selectedPlayers = [...this.selectedPlayers, player];
        this.forms.setPlayersValue(this.selectedPlayers);
    }

    public removePlayer(player: ShortPlayer): void {
        this.selectedPlayers = this.selectedPlayers.filter(
            (p) => p.user_id !== player.user_id
        );
        this.forms.setPlayersValue(this.selectedPlayers);
    }

    public createTeam(team: TeamCreate): void {
        this.httpTeams
            .createTeam(team)
            .pipe(
                tap(() => {
                    this.closePopup(team);
                })
            )
            .subscribe();
    }

    public closePopup(team: TeamCreate | false): void {
        this.dialogRef.close(team);
    }
}
