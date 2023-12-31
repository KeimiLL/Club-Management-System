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

import { UserService } from "../../../../../../../shared/api/user.service";
import { PermissionBackgroundColorDirective } from "../../../../../../../shared/directives/permission-background-color.directive";
import { PermissionColorDirective } from "../../../../../../../shared/directives/permission-color.directive";
import { Meeting } from "../../../../../../../shared/models/meeting.model";
import { ShortUser } from "../../../../../../../shared/models/user.model";
import { CardsModule } from "../../../../../../../shared/modules/cards.module";
import { MaterialModule } from "../../../../../../../shared/modules/material.module";
import { FilterUsingArrayPipe } from "../../../../../../../shared/pipes/filter-using-array.pipe";
import { FilterUsingPropControlPipe } from "../../../../../../../shared/pipes/filter-using-prop-control.pipe";
import { NewMeetingFormGroup } from "./newMeetingFormBuilder";
import { MeetingsPopupActionsService } from "./services/meetings-popup-actions.service";
import { MeetingsPopupFormService } from "./services/meetings-popup-form.service";
import { MeetingsPopupRootService } from "./services/meetings-popup-root.service";

@Component({
    selector: "app-meeting-popup",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CardsModule,
        ReactiveFormsModule,
        FormsModule,
        PermissionColorDirective,
        PermissionBackgroundColorDirective,
        FilterUsingArrayPipe,
        FilterUsingPropControlPipe,
    ],
    templateUrl: "./meeting-popup.component.html",
    styleUrls: ["./meeting-popup.component.scss"],
    providers: [
        MeetingsPopupActionsService,
        MeetingsPopupFormService,
        MeetingsPopupRootService,
    ],
})
export class MeetingPopupComponent implements OnInit {
    protected isEditMode = false;

    protected meetingForm: FormGroup<NewMeetingFormGroup>;
    protected attendeeInputControl: FormControl<string | null>;

    protected currentUser: ShortUser;

    protected allAttendees$: Observable<ShortUser[]>;
    protected selectedAttendees$: Observable<ShortUser[]>;
    protected filteredAttendees$: Observable<ShortUser[]>;

    constructor(
        private readonly actions: MeetingsPopupActionsService,
        private readonly forms: MeetingsPopupFormService,
        private readonly root: MeetingsPopupRootService,
        private readonly userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: Meeting | null
    ) {
        this.meetingForm = this.forms.meetingForm;
        this.attendeeInputControl = this.forms.attendeeInputControl;
        this.root.initData(this.data);
        this.forms.patchFormValue(this.data);
    }

    ngOnInit(): void {
        this.isEditMode = this.data !== null;
        this.currentUser = this.userService.currentUser as ShortUser;
        this.allAttendees$ = this.root.allAttendees$;
        this.selectedAttendees$ = this.root.selectedAttendees$;
    }

    protected onCloseClick(): void {
        this.actions.closePopup(false);
    }

    protected onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.forms.setDateInMeetingForm(event.value as Date);
    }

    protected onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        this.root.selectAttendee(event.option.value);
    }

    protected removeAttendee(attendee: ShortUser): void {
        this.root.removeAttendee(attendee);
    }

    protected isButtonDisabled(): boolean {
        if (!this.isEditMode) return this.meetingForm.invalid;
        return false;
    }

    protected onSubmit(): void {
        if (this.isEditMode && this.data !== null) {
            this.actions.editMeeting(this.data.id);
        } else this.actions.createNewMeeting();
    }
}
