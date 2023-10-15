import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { CreateCoachDates } from "../../../../../../../../../shared/models/coach.model";
import { CardsModule } from "../../../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../../../shared/modules/material.module";
import { formatDateFromInputForBackend } from "../../../../../../../../../shared/utils/dateHelpers";
import {
    NewCoachControls,
    newCoachDataFormBuilder,
} from "./newCoachFormBuilder";

@Component({
    selector: "app-create-coach-popup",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: "./create-coach-popup.component.html",
    styleUrls: ["./create-coach-popup.component.scss"],
})
export class CreateCoachPopupComponent {
    protected coachForm: FormGroup<NewCoachControls>;

    constructor(
        private readonly dialogRef: MatDialogRef<CreateCoachPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.coachForm = newCoachDataFormBuilder.buildFormGroup();
    }

    public setBirthDate(event: MatDatepickerInputEvent<Date>): void {
        this.coachForm.controls.date_of_birth.setValue(
            formatDateFromInputForBackend(event.value as Date)
        );
    }

    public setJoiningDate(event: MatDatepickerInputEvent<Date>): void {
        this.coachForm.controls.date_of_birth.setValue(
            formatDateFromInputForBackend(event.value as Date)
        );
    }

    public onCloseClick(): void {
        this.dialogRef.close(false);
    }

    public onSubmit(): void {
        this.dialogRef.close(this.coachForm.value as CreateCoachDates);
    }
}
