import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Meeting } from "../../../../../../../shared/models/meetings.model";
import { formatDateFromInputForBackend } from "../../../../../../../shared/utils/dateHelpers";

export interface NewMeetingFormGroup {
    meeting: FormGroup<MeetingControls>;
    user_ids: FormControl<number[]>;
}

interface MeetingControls {
    name: FormControl<string>;
    date: FormControl<string>;
    notes: FormControl<string | null>;
}

export const newMeetingDataFormBuilder = {
    buildFormGroup: (meeting: Meeting | null): FormGroup<NewMeetingFormGroup> =>
        new FormGroup<NewMeetingFormGroup>({
            meeting: new FormGroup<MeetingControls>({
                name: new FormControl<string>(meeting?.name ?? "", {
                    nonNullable: true,
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(20),
                    ],
                }),
                date: new FormControl<string>(
                    meeting?.date ?? formatDateFromInputForBackend(new Date()),
                    { nonNullable: true, validators: Validators.required }
                ),
                notes: new FormControl<string | null>(meeting?.notes ?? null, {
                    nonNullable: false,
                }),
            }),
            user_ids: new FormControl<number[]>(
                meeting?.users.map((user) => user.id) ?? [],
                {
                    nonNullable: true,
                    validators: Validators.required,
                }
            ),
        }),
};
