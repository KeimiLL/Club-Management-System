import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of, switchMap, takeWhile } from "rxjs";

import { CreateCoach } from "../../../../../../../../shared/models/coach.model";
import { BackendResponse } from "../../../../../../../../shared/models/misc.model";
import { Roles } from "../../../../../../../../shared/models/user.model";
import { CreateCoachPopupComponent } from "../components/create-coach-popup/create-coach-popup.component";
import { CreatePlayerPopupComponent } from "../components/create-player-popup/create-player-popup.component";
import { UserService } from "./../../../../../../../../shared/services/user.service";
import { ModifyUsersHttpService } from "./modify-users-http.service";

@Injectable()
export class ModifyUsersPopupService {
    constructor(
        private readonly dialog: MatDialog,
        private readonly http: ModifyUsersHttpService,
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
                return this.openPlayerPopup$();
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
                switchMap((coachDates) => {
                    if (coachDates === false) return of(null);

                    const createCoachObject: CreateCoach = {
                        ...coachDates,
                        user_id: id,
                    };
                    return this.http.createCoach(createCoachObject);
                }),
                takeWhile((response) => response !== null),
                switchMap(() => this.changeRole$(Roles.Coach, id))
            );
    }

    private openPlayerPopup$(): Observable<BackendResponse | null> {
        return this.dialog
            .open(CreatePlayerPopupComponent, {
                width: "30vw",
                disableClose: true,
            })
            .afterClosed();
    }

    private changeRole$(role: Roles, id: number): Observable<BackendResponse> {
        return this.userService.updateRole(id, role);
    }
}
