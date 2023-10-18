import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { ShortCoach } from "../../../../../../../shared/models/coach.model";
import { ShortPlayer } from "../../../../../../../shared/models/player.model";
import { TeamCreate } from "../../../../../../../shared/models/team.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { FilterUsingArrayPipe } from "../../../../../../../shared/pipes/filter-using-array.pipe";
import { MaterialModule } from "./../../../../../../../shared/modules/material.module";
import { TeamControls } from "./newTeamFormBuilder";
import { TeamsPopupFormsService } from "./services/teams-popup-forms.service";
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
    providers: [TeamsPopupRootService, TeamsPopupFormsService],
})
export class TeamsPopupComponent {
    protected teamForm: FormGroup<TeamControls>;
    protected coachInputControl = new FormControl<string>("");
    protected playerInputControl = new FormControl<string>("");

    protected coaches$: Observable<ShortCoach[]>;
    protected allPlayers$: Observable<ShortPlayer[]>;
    protected selectedPlayers$: Observable<ShortPlayer[]>;

    constructor(
        private readonly root: TeamsPopupRootService,
        private readonly forms: TeamsPopupFormsService,
        @Inject(MAT_DIALOG_DATA) public data: TeamCreate | null
    ) {
        this.coachInputControl = this.forms.coachInputControl;
        this.playerInputControl = this.forms.playerInputControl;
        this.teamForm = this.forms.teamForm;
        this.forms.patchFormValue(data);

        this.coaches$ = this.root.coaches$;
        this.allPlayers$ = this.root.allPlayers$;
        this.selectedPlayers$ = this.root.selectedPlayers$;
    }

    protected onCoachSelect(event: MatAutocompleteSelectedEvent): void {
        this.forms.setCoachValue(event.option.value as ShortCoach);
    }

    protected onPlayerSelect(event: MatAutocompleteSelectedEvent): void {
        this.root.selectPlayer(event.option.value as ShortPlayer);
    }

    protected onPlayerRemove(player: ShortPlayer): void {
        this.root.removePlayer(player);
    }

    protected onCloseClick(): void {
        this.root.closePopup(false);
    }

    protected onSubmit(): void {
        this.root.createTeam(this.teamForm.value as TeamCreate);
    }
}
