import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";

import {
    Match,
    MatchCreate,
} from "../../../../../../../shared/models/match.model";
import { ShortPlayer } from "../../../../../../../shared/models/player.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { FilterUsingArrayPipe } from "../../../../../../../shared/pipes/filter-using-array.pipe";
import { FilterUsingPropControlPipe } from "../../../../../../../shared/pipes/filter-using-prop-control.pipe";
import { MatchControls } from "./newMatchFormBuilder";
import { SchedulePopupFormsService } from "./services/schedule-popup-forms.service";
import { SchedulePopupRootService } from "./services/schedule-popup-root.service";

@Component({
    selector: "app-schedule-popup",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        FilterUsingArrayPipe,
        FilterUsingPropControlPipe,
    ],
    providers: [SchedulePopupFormsService, SchedulePopupRootService],
    templateUrl: "./schedule-popup.component.html",
    styleUrls: ["./schedule-popup.component.scss"],
})
export class SchedulePopupComponent {
    protected matchForm: FormGroup<MatchControls>;
    protected playerInputControl = new FormControl<string>("");

    protected allPlayers$: Observable<ShortPlayer[]>;
    protected selectedPlayers$: Observable<ShortPlayer[]>;

    constructor(
        private readonly forms: SchedulePopupFormsService,
        private readonly root: SchedulePopupRootService,
        @Inject(MAT_DIALOG_DATA)
        public data: { match: Match | null; teamId: number }
    ) {
        this.root.initData(this.data.teamId);
        this.forms.patchFormValue(this.data.match);
        this.playerInputControl = this.forms.playerInputControl;
        this.matchForm = this.forms.matchForm;
        this.allPlayers$ = this.root.allPlayers$;
        this.selectedPlayers$ = this.root.selectedPlayers$;
    }

    protected onPlayerSelect(event: MatAutocompleteSelectedEvent): void {
        this.root.selectPlayer(event.option.value as ShortPlayer);
    }

    protected onPlayerRemove(player: ShortPlayer): void {
        this.root.removePlayer(player);
    }

    protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.forms.setDateInMeetingForm(event.value as Date);
    }

    protected onCloseClick(): void {
        this.root.closePopup(false);
    }

    protected onSubmit(): void {
        const newMatch = this.matchForm.value as MatchCreate;
        newMatch.match.team_id = this.data.teamId;
        this.root.createMatch(newMatch);
    }
}
