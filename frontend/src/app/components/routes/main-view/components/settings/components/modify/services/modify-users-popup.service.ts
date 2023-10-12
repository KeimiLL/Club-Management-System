import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Roles } from "../../../../../../../../shared/models/user.model";
import { CreateCoachPopupComponent } from "../components/create-coach-popup/create-coach-popup.component";
import { CreatePlayerPopupComponent } from "../components/create-player-popup/create-player-popup.component";

type CreatePopupComponent =
    | CreateCoachPopupComponent
    | CreatePlayerPopupComponent;

@Injectable()
export class ModifyUsersPopupService {
    constructor(private readonly dialog: MatDialog) {}

    public rolePopupSwitch(
        role: Roles
    ): MatDialogRef<CreatePopupComponent> | null {
        switch (role) {
            case Roles.Coach:
                return this.openCoachPopup();
            case Roles.Player:
                return this.openPlayerPopup();
            default:
                return null;
        }
    }

    private openCoachPopup(): MatDialogRef<CreateCoachPopupComponent> {
        return this.dialog.open(CreateCoachPopupComponent, {
            width: "30vw",
            disableClose: true,
        });
    }

    private openPlayerPopup(): MatDialogRef<CreatePlayerPopupComponent> {
        return this.dialog.open(CreatePlayerPopupComponent, {
            width: "30vw",
            disableClose: true,
        });
    }
}
