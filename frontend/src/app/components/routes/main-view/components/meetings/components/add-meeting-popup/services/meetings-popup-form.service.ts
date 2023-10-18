import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import {
    Meeting,
    NewMeeting,
} from "../../../../../../../../shared/models/meeting.model";
import { ShortUser } from "../../../../../../../../shared/models/user.model";
import { formatDateFromInputForBackend } from "../../../../../../../../shared/utils/dateHelpers";
import { DestroyClass } from "../../../../../../../../shared/utils/destroyClass";
import {
    newMeetingDataFormBuilder,
    NewMeetingFormGroup,
} from "../newMeetingFormBuilder";

@Injectable()
export class MeetingsPopupFormService extends DestroyClass {
    public meetingForm: FormGroup<NewMeetingFormGroup>;
    public attendeeInputControl = new FormControl<string>("");

    constructor() {
        super();
        this.meetingForm = newMeetingDataFormBuilder.buildFormGroup();
    }

    public patchFormValue(meeting: Meeting | null): void {
        if (meeting === null) return;
        this.meetingForm.patchValue(this.meetingMapper(meeting));
    }

    private meetingMapper(meeting: Meeting): NewMeeting {
        return {
            meeting: {
                name: meeting.name,
                date: meeting.date,
                notes: meeting.notes,
            },
            user_ids: meeting.users.map((user) => user.id),
        };
    }

    public setAttendeesValue(attendees: ShortUser[]): void {
        this.attendeeInputControl.setValue("");
        this.meetingForm.controls.user_ids.setValue(attendees.map((a) => a.id));
    }

    public setDateInMeetingForm(selectedDate: Date): void {
        this.meetingForm.controls.meeting.controls.date.setValue(
            formatDateFromInputForBackend(selectedDate)
        );
    }

    public getFormData(): NewMeeting {
        return this.meetingForm.value as NewMeeting;
    }
}
