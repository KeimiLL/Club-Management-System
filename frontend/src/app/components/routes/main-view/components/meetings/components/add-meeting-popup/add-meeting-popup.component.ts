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
import { MeetingsPopupService } from "./services/meetings-popup.service";
import { MeetingsPopupHttpService } from "./services/meetings-popup-http.service";

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
        private readonly root: MeetingsPopupService,
        private readonly http: MeetingsPopupHttpService,
        private readonly dialogRef: MatDialogRef<AddMeetingPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.meetingForm = this.root.meetingForm;
        this.attendeeInputControl = this.root.attendeeInputControl;
        this.dateInputControl = this.root.dateInputControl;
    }

    ngOnInit(): void {
        this.allAttendees$ = this.root.allAttendees$;
        this.filteredAttendees$ = this.root.filtredAttendees$;
        this.selectedAttendees$ = this.root.selectedAttendees$;
    }

    protected onCloseClick(): void {
        this.dialogRef.close();
    }

    protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.root.setDateInMeetingForm(event.value as Date);
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.root.addAttendeeToSelectedList(event.option.value);
    }

    protected removeAttendee(attendee: User): void {
        this.root.removeAttendeeFromSelectedList(attendee);
    }
}
