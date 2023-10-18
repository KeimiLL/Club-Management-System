import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { TeamsHttpService } from "../../../../../../../../../shared/api/teams-http.service";
import { PlayerBase } from "../../../../../../../../../shared/models/player.model";
import { ShortTeam } from "../../../../../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { formatDateFromInputForBackend } from "../../../../../../../../../shared/utils/dateHelpers";
import {
    NewPlayerControls,
    newPlayerDataFormBuilder,
} from "./newPlayerFormBuilder";

@Component({
    selector: "app-create-player-popup",
    standalone: true,
    imports: [CommonModule, CardsModule, MaterialModule, ReactiveFormsModule],
    templateUrl: "./create-player-popup.component.html",
    styleUrls: ["./create-player-popup.component.scss"],
})
export class CreatePlayerPopupComponent {
    protected playerForm: FormGroup<NewPlayerControls>;
    protected teams$: Observable<ShortTeam[]>;

    constructor(
        private readonly dialogRef: MatDialogRef<CreatePlayerPopupComponent>,
        private readonly http: TeamsHttpService,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.playerForm = newPlayerDataFormBuilder.buildFormGroup();
        this.teams$ = this.http.getAllTeams();
    }

    public setBirthDate(event: MatDatepickerInputEvent<Date>): void {
        this.playerForm.controls.date_of_birth.setValue(
            formatDateFromInputForBackend(event.value as Date)
        );
    }

    public setJoiningDate(event: MatDatepickerInputEvent<Date>): void {
        this.playerForm.controls.date_of_birth.setValue(
            formatDateFromInputForBackend(event.value as Date)
        );
    }

    public onCloseClick(): void {
        this.dialogRef.close(false);
    }

    public onSubmit(): void {
        this.dialogRef.close(this.playerForm.value as PlayerBase);
    }
}
