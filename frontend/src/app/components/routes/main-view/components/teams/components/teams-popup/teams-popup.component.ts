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
import { ShortPlayer } from "../../../../../../../shared/models/player.model";
import {
    Team,
    TeamCreate,
} from "../../../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { FilterUsingArrayPipe } from "../../../../../../../shared/pipes/filter-using-array.pipe";
import { MaterialModule } from "./../../../../../../../shared/modules/material.module";
import { newTeamDataFormBuilder, TeamControls } from "./newTeamFormBuilder";
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
        FilterUsingArrayPipe,
    ],
    templateUrl: "./teams-popup.component.html",
    styleUrls: ["./teams-popup.component.scss"],
    providers: [TeamsPopupRootService],
})
export class TeamsPopupComponent {
    protected teamForm: FormGroup<TeamControls>;
    protected coachInputControl = new FormControl<string>("");
    protected playerInputControl = new FormControl<string>("");

    protected coaches$: Observable<ShortCoach[]>;
    protected allPlayers$: Observable<ShortPlayer[]>;
    protected selectedPlayers$: Observable<ShortPlayer[]>;

    constructor(
        private readonly dialogRef: MatDialogRef<TeamsPopupComponent>,
        private readonly root: TeamsPopupRootService,
        @Inject(MAT_DIALOG_DATA) public data: Team | null
    ) {
        this.teamForm = newTeamDataFormBuilder.buildFormGroup(null);
        this.coaches$ = this.root.coaches$;
        this.allPlayers$ = this.root.allPlayers$;
        this.selectedPlayers$ = this.root.selectedPlayers$;
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        const coach = event.option.value as ShortCoach;
        this.teamForm.controls.team.controls.coach_id.setValue(coach.user_id);
        this.coachInputControl.setValue(coach.user_full_name);
    }

    protected selectPlayer(player: ShortPlayer): void {
        this.root.selectPlayer(player);
    }

    protected removePlayer(player: ShortPlayer): void {
        this.root.removePlayer(player);
    }

    protected onCloseClick(): void {
        this.dialogRef.close(false);
    }

    protected onSubmit(): void {
        this.root.createTeam(this.teamForm.value as TeamCreate);
    }
}
