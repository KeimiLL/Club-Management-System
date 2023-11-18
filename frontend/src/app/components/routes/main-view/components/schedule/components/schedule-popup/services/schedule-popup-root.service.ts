import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

import { TeamsHttpService } from "../../../../../../../../shared/api/teams-http.service";
import { MatchCreate } from "../../../../../../../../shared/models/match.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";
import { SchedulePopupComponent } from "../schedule-popup.component";
import { SchedulePopupFormsService } from "./schedule-popup-forms.service";

@Injectable()
export class SchedulePopupRootService {
    private readonly allPlayersStore$ = new BehaviorSubject<ShortPlayer[]>([]);
    private readonly selectedPlayersStore$ = new BehaviorSubject<ShortPlayer[]>(
        []
    );

    private set allPlayers(players: ShortPlayer[]) {
        this.allPlayersStore$.next(players);
    }

    public get allPlayers$(): Observable<ShortPlayer[]> {
        return this.allPlayersStore$.asObservable();
    }

    private set selectedPlayers(players: ShortPlayer[]) {
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
        private readonly dialogRef: MatDialogRef<SchedulePopupComponent>,
        private readonly forms: SchedulePopupFormsService
    ) {}

    public initData(teamId: number): void {
        this.httpTeams
            .getTeamById(teamId)
            .pipe(
                map((team) => team.players),
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

    public createMatch(match: MatchCreate): void {
        // this.httpMatch
        //     .postNewMatch(team)
        //     .pipe(
        //         tap(() => {
        //             this.closePopup(team);
        //         })
        //     )
        //     .subscribe();
    }

    public closePopup(team: MatchCreate | false): void {
        this.dialogRef.close(team);
    }
}
