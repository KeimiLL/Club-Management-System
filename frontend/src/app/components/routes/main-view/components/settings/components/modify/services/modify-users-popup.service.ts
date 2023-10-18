import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of, switchMap, takeWhile } from "rxjs";

import { CoachesHttpService } from "../../../../../../../../shared/api/coaches-http.service";
import { PlayersHttpService } from "../../../../../../../../shared/api/players-http.service";
import { UserService } from "../../../../../../../../shared/api/user.service";
import { CreateCoach } from "../../../../../../../../shared/models/coach.model";
import { BackendResponse } from "../../../../../../../../shared/models/misc.model";
import { Player } from "../../../../../../../../shared/models/player.model";
import { Roles } from "../../../../../../../../shared/models/user.model";
import { CreateCoachPopupComponent } from "../components/create-coach-popup/create-coach-popup.component";
import { CreatePlayerPopupComponent } from "../components/create-player-popup/create-player-popup.component";
import { PlayerBase } from "./../../../../../../../../shared/models/player.model";

@Injectable()
export class ModifyUsersPopupService {
    constructor(
        private readonly dialog: MatDialog,
        private readonly httpCoach: CoachesHttpService,
        private readonly httpPlayer: PlayersHttpService,
        private readonly userService: UserService
    ) {}

    public rolePopupSwitch$(
        userId: number,
        role: Roles
    ): Observable<BackendResponse | null> {
        switch (role) {
            case Roles.Coach:
                return this.openCoachPopup$(userId);
            case Roles.Player:
                return this.openPlayerPopup$(userId);
            default:
                return this.changeRole$(role, userId);
        }
    }

    private openCoachPopup$(id: number): Observable<BackendResponse | null> {
        return this.dialog
            .open(CreateCoachPopupComponent, {
                width: "30vw",
                disableClose: true,
            })
            .afterClosed()
            .pipe(
                switchMap((coachDates: CreateCoach | false) => {
                    if (coachDates === false) return of(null);

                    const createCoachObject: CreateCoach = {
                        ...coachDates,
                        user_id: id,
                    };
                    return this.httpCoach.createCoach(createCoachObject);
                }),
                takeWhile((response) => response !== null),
                switchMap(() => this.changeRole$(Roles.Coach, id))
            );
    }

    private openPlayerPopup$(id: number): Observable<BackendResponse | null> {
        return this.dialog
            .open(CreatePlayerPopupComponent, {
                width: "50vw",
                disableClose: true,
            })
            .afterClosed()
            .pipe(
                switchMap((playerInfo: PlayerBase | false) => {
                    if (playerInfo === false) return of(null);

                    const createPlayerObject: Player = {
                        ...playerInfo,
                        user_id: id,
                        diet: null,
                        is_injured: false,
                    };
                    return this.httpPlayer.createPlayer(createPlayerObject);
                }),
                takeWhile((response) => response !== null),
                switchMap(() => this.changeRole$(Roles.Player, id))
            );
    }

    private changeRole$(role: Roles, id: number): Observable<BackendResponse> {
        return this.userService.updateRole(id, role);
    }
}
