import { Injectable } from "@angular/core";

import { MatchCreate } from "../../../../../../../../shared/models/match.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";

@Injectable()
export class SchedulePopupFormsService {
    // public teamForm: FormGroup<ScheduleControls>;
    // public playerInputControl = new FormControl<string>("");

    constructor() {
        console.log("test");
        // this.teamForm = newScheduleDataFormBuilder.buildFormGroup();
    }

    public patchFormValue(team: MatchCreate | null): void {
        // if (team === null) return;
        // this.teamForm.patchValue(team);
    }

    public setPlayersValue(players: ShortPlayer[]): void {
        // this.playerInputControl.setValue("");
        // this.teamForm.controls.player_ids.setValue(
        //     players.map((player) => player.user_id)
        // );
    }
}
