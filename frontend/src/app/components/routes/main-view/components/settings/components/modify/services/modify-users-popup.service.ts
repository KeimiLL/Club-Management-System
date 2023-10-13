import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, Observable, of, switchMap } from "rxjs";

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

    public rolePopupSwitch$(role: Roles): Observable<BackendResponse | null> {
        switch (role) {
            case Roles.Coach:
                return this.openCoachPopup$();
            case Roles.Player:
                return this.openPlayerPopup$();
            default:
                return of(null);
        }
    }

    private openCoachPopup$(): Observable<BackendResponse | null> {
        return this.dialog
            .open(CreateCoachPopupComponent, {
                width: "30vw",
                disableClose: true,
            })
            .afterClosed()
            .pipe(
                switchMap((coachDates) => {
                    if (coachDates === false) return of(null);
                    if (this.userService.currentUser === null) return of(null);

                    const createCoachObject = {
                        ...coachDates,
                        user_id: this.userService.currentUser.id,
                    };
                    return this.http.createCoach(createCoachObject);
                }),
                catchError(() => of(null))
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
}
