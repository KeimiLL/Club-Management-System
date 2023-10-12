import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, of } from "rxjs";

import { Roles } from "../../../../../../../../shared/models/user.model";
import { CreateCoachPopupComponent } from "../components/create-coach-popup/create-coach-popup.component";
import { CreatePlayerPopupComponent } from "../components/create-player-popup/create-player-popup.component";
import { ModifyUsersHttpService } from "./modify-users-http.service";

type CreatePopupComponent =
    | CreateCoachPopupComponent
    | CreatePlayerPopupComponent;

@Injectable()
export class ModifyUsersPopupService {
    constructor(
        private readonly dialog: MatDialog,
        private readonly http: ModifyUsersHttpService
    ) {}

    public rolePopupSwitch$(
        role: Roles
    ): Observable<MatDialogRef<CreatePopupComponent> | null> {
        switch (role) {
            case Roles.Coach:
                return this.openCoachPopup$();
            case Roles.Player:
                return this.openPlayerPopup$();
            default:
                return of(null);
        }
    }

    private openCoachPopup$(): Observable<MatDialogRef<CreateCoachPopupComponent> | null> {
        return this.dialog
            .open(CreateCoachPopupComponent, {
                width: "30vw",
                disableClose: true,
            })
            .afterClosed();
    }

    private openPlayerPopup$(): Observable<MatDialogRef<CreatePlayerPopupComponent> | null> {
        return this.dialog
            .open(CreatePlayerPopupComponent, {
                width: "30vw",
                disableClose: true,
            })
            .afterClosed();
    }
}
