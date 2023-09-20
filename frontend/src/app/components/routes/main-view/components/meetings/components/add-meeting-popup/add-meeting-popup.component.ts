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
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { DateAndTimeFormComponent } from "../../../../../../../shared/components/date-and-time-form/date-and-time-form.component";
import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { ShortUser } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { NewMeetingFormGroup } from "./newMeetingFormBuilder";
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
    providers: [MeetingsPopupService, MeetingsPopupHttpService],
})
export class AddMeetingPopupComponent implements OnInit {
    protected meetingForm: FormGroup<NewMeetingFormGroup>;
    protected attendeeInputControl: FormControl<string | null>;

    protected readonly minDate = new Date();

    protected allAttendees$: Observable<ShortUser[]>;
    protected selectedAttendees$: Observable<ShortUser[]>;
    protected filteredAttendees$: Observable<ShortUser[]>;

    constructor(
        private readonly root: MeetingsPopupService,
        @Inject(MAT_DIALOG_DATA) public data: unknown
    ) {
        this.meetingForm = this.root.meetingForm;
        this.attendeeInputControl = this.root.attendeeInputControl;
    }

    ngOnInit(): void {
        this.allAttendees$ = this.root.allAttendees$;
        this.filteredAttendees$ = this.root.filtredAttendees$;
        this.selectedAttendees$ = this.root.selectedAttendees$;
    }

    protected onCloseClick(): void {
        this.root.closePopup();
    }

    protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.root.setDateInMeetingForm(event.value as Date);
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.root.addAttendeeToSelectedList(event.option.value);
    }

    protected removeAttendee(attendee: ShortUser): void {
        this.root.removeAttendeeFromSelectedList(attendee);
    }

    protected isButtonDisabled(): boolean {
        return this.meetingForm.invalid;
    }

    protected onSubmit(): void {
        this.root.createNewMeeting();
    }
}
