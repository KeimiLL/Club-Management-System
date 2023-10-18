import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { ShortCoach } from "../../../../../../../../shared/models/coach.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";
import { TeamCreate } from "../../../../../../../../shared/models/team.model";
import { newTeamDataFormBuilder, TeamControls } from "../newTeamFormBuilder";

@Injectable()
export class TeamsPopupFormsService {
    public teamForm: FormGroup<TeamControls>;
    public coachInputControl = new FormControl<string>("");
    public playerInputControl = new FormControl<string>("");

    constructor() {
        this.teamForm = newTeamDataFormBuilder.buildFormGroup();
    }

    public patchFormValue(team: TeamCreate | null): void {
        if (team === null) return;
        this.teamForm.patchValue(team);
    }

    public setPlayersValue(players: ShortPlayer[]): void {
        this.playerInputControl.setValue("");
        this.teamForm.controls.player_ids.setValue(
            players.map((player) => player.user_id)
        );
    }

    public setCoachValue(coach: ShortCoach): void {
        this.teamForm.controls.team.controls.coach_id.setValue(coach.user_id);
        this.coachInputControl.setValue(coach.user_full_name);
    }
}
