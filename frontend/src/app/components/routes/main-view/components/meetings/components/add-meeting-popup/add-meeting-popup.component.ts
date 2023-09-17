import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { DateAndTimeFormComponent } from "../../../../../../../shared/components/date-and-time-form/date-and-time-form.component";
import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { User } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { MeetingsPopupService } from "./meetings-popup.service";

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
        DateAndTimeFormComponent,
    ],
    templateUrl: "./add-meeting-popup.component.html",
    styleUrls: ["./add-meeting-popup.component.scss"],
    providers: [MeetingsPopupService],
})
export class AddMeetingPopupComponent implements OnInit {
    protected meetingForm: FormGroup;
    protected dateInputControl: FormControl<Date | null>;
    protected attendeeInputControl: FormControl<string | null>;

    protected readonly minDate = new Date();

    protected allAttendees$: Observable<User[]>;
    protected selectedAttendees$: Observable<User[]>;
    protected filteredAttendees$: Observable<User[]>;

    constructor(
        private readonly popupService: MeetingsPopupService,
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.meetingForm = this.popupService.meetingForm;
        this.attendeeInputControl = this.popupService.attendeeInputControl;
        this.dateInputControl = this.popupService.dateInputControl;
    }

    ngOnInit(): void {
        this.allAttendees$ = this.popupService.allAttendees$;
        this.filteredAttendees$ = this.popupService.filtredAttendees$;
        this.selectedAttendees$ = this.popupService.selectedAttendees$;
    }

    protected onCloseClick(): void {
        this.dialogRef.close();
    }

    protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
        const selectedDate = event.value as Date;
        this.meetingForm.get("date")?.setValue(selectedDate.toISOString());
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.popupService.addAttendeeToSelectedList(event.option.value);
    }

    protected removeAttendee(attendee: User): void {
        this.popupService.removeAttendeeFromSelectedList(attendee);
    }
}
