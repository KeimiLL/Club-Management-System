import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { Match } from "../../../../../../../../shared/models/match.model";
import { ShortPlayer } from "../../../../../../../../shared/models/player.model";
import { formatDateFromInputForBackend } from "../../../../../../../../shared/utils/dateHelpers";
import { MatchControls, newMatchDataFormBuilder } from "../newMatchFormBuilder";

@Injectable()
export class SchedulePopupFormsService {
    public matchForm: FormGroup<MatchControls>;
    public playerInputControl = new FormControl<string>("");

    constructor() {
        this.matchForm = newMatchDataFormBuilder.buildFormGroup();
    }

    public patchFormValue(match: Match | null): void {
        if (match === null) return;
        this.matchForm.controls.match.patchValue(match);
        // this.matchForm.controls.player_ids.patchValue(match.players);
    }

    public setPlayersValue(players: ShortPlayer[]): void {
        this.playerInputControl.setValue("");
        this.matchForm.controls.player_ids.setValue(
            players.map((player) => player.user_id)
        );
    }

    public setDateInMeetingForm(selectedDate: Date): void {
        this.matchForm.controls.match.controls.date.setValue(
            formatDateFromInputForBackend(selectedDate)
        );
    }
}
