import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { ShortCoach } from "../../../../../../../shared/models/coach.model";
import {
    Team,
    TeamCreate,
} from "../../../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "./../../../../../../../shared/modules/material.module";
import { newTeamDataFormBuilder, TeamControls } from "./newTeamFormBuilder";
import { TeamsPopupHttpService } from "./services/teams-popup-http.service";
import { TeamsPopupRootService } from "./services/teams-popup-root.service";

@Component({
    selector: "app-teams-popup",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: "./teams-popup.component.html",
    styleUrls: ["./teams-popup.component.scss"],
    providers: [TeamsPopupHttpService, TeamsPopupRootService],
})
export class TeamsPopupComponent {
    protected teamForm: FormGroup<TeamControls>;
    protected coachInputControl = new FormControl<string>("");

    protected coaches$: Observable<ShortCoach[]>;

    constructor(
        private readonly dialogRef: MatDialogRef<TeamsPopupComponent>,
        private readonly root: TeamsPopupRootService,
        @Inject(MAT_DIALOG_DATA) public data: Team | null
    ) {
        this.teamForm = newTeamDataFormBuilder.buildFormGroup(null);
        this.coaches$ = this.root.coaches$;
    }

    public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        const coach = event.option.value as ShortCoach;
        this.teamForm.controls.coach_id.setValue(coach.user_id);
        this.coachInputControl.setValue(coach.user_full_name);
    }

    public onCloseClick(): void {
        this.dialogRef.close(false);
    }

    public onSubmit(): void {
        this.root.createTeam(this.teamForm.value as TeamCreate);
    }
}
