import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { CoachesHttpService } from "../../../../../../../../shared/api/coaches-http.service";
import { TeamsHttpService } from "../../../../../../../../shared/api/teams-http.service";
import { ShortCoach } from "../../../../../../../../shared/models/coach.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";
import { TeamCreate } from "../../../../../../../../shared/models/team.model";
import { TeamsPopupComponent } from "../teams-popup.component";

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

    public get selectedPlayers$(): Observable<ShortPlayer[]> {
        return this.selectedPlayersStore$.asObservable();
    }

    constructor(
        private readonly httpTeams: TeamsHttpService,
        private readonly httpCoaches: CoachesHttpService,
        private readonly dialogRef: MatDialogRef<TeamsPopupComponent>
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
    }

    public selectPlayer(player: ShortPlayer): void {
        this.selectedPlayers = [...this.selectedPlayers, player];
        // this.playerInputControl.setValue("");
        // this.teamForm
        //     .get("user_ids")
        //     ?.setValue(this.selectedAttendees.map((a) => a.id));
    }

    public removePlayer(player: ShortPlayer): void {
        this.selectedPlayers = this.selectedPlayers.filter(
            (p) => p.user_id !== player.user_id
        );

        // this.meetingForm
        //     .get("user_ids")
        //     ?.setValue(this.selectedAttendees.map((a) => a.id));
    }

    public createTeam(team: TeamCreate): void {
        this.httpTeams
            .createTeam(team)
            .pipe(
                tap(() => {
                    this.dialogRef.close(team);
                })
            )
            .subscribe();
    }
}
