import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { MatchEventType } from "../../../../../../../../../../../shared/models/match-event.model";
import { CardsModule } from "../../../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../../../shared/modules/material.module";
import { NewEventControls, newEventFormBuilder } from "./newEventFormBuilder";

@Component({
    selector: "app-match-event-popup",
    standalone: true,
    imports: [CommonModule, MaterialModule, CardsModule, ReactiveFormsModule],
    templateUrl: "./match-event-popup.component.html",
    styleUrls: ["./match-event-popup.component.scss"],
})
export class MatchEventPopupComponent {
    protected readonly eventsForm: FormGroup<NewEventControls>;
    protected types: string[];

    constructor(
        private readonly dialogRef: MatDialogRef<MatchEventPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.eventsForm = newEventFormBuilder.buildFormGroup();
        this.types = Object.values(MatchEventType);
    }

    protected onSubmit(): void {
        console.log(this.eventsForm);
    }
}
