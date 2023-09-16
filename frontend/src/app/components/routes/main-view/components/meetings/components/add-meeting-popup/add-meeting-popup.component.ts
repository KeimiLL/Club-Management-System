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

import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { attendees } from "../../../../../../../shared/mock/meetings.mock";
import { User } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { newMeetingDataFormBuilder } from "./newMeetingFormBuilder";

@Component({
    selector: "app-add-meeting-popup",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        FormsModule,
        PermissionColorDirective,
    ],
    templateUrl: "./add-meeting-popup.component.html",
    styleUrls: ["./add-meeting-popup.component.scss"],
})
export class AddMeetingPopupComponent {
    protected meetingForm: FormGroup;
    protected readonly minDate = new Date();

    protected attendeeInputControl = new FormControl();
    protected allAttendees: User[] = attendees;
    protected attendees: User[] = [];
    protected filteredAttendees: User[] = [];

    constructor(
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.meetingForm = newMeetingDataFormBuilder.buildFormGroup();
    }

    protected onCloseClick(): void {
        this.dialogRef.close();
    }

    protected onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const { value } = input;

        if (value.trim() !== "") {
            this.filteredAttendees = this.allAttendees.filter(
                (attendee) =>
                    attendee.full_name
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) === 0 &&
                    !this.attendees.some((a) => a.id === attendee.id)
            );
        } else {
            this.filteredAttendees = this.allAttendees.filter(
                (attendee) => !this.attendees.some((a) => a.id === attendee.id)
            );
        }
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.attendees.push(event.option.value);
        this.attendeeInputControl.setValue("");
    }

    protected onEnter(): void {
        if (this.filteredAttendees.length === 1) {
            this.attendees.push(this.filteredAttendees[0]);
            this.attendeeInputControl.setValue("");
        }
    }

    protected removeAttendee(attendee: User): void {
        const index = this.attendees.indexOf(attendee);

        if (index >= 0) {
            this.attendees.splice(index, 1);
        }
    }
}
