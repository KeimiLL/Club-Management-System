import { FormControl, FormGroup, Validators } from "@angular/forms";

import { formatDateFromInputForBackend } from "../../../../../../../shared/utils/dateHelpers";

export interface NewMeetingFormGroup {
    meeting: FormGroup<MeetingControls>;
    user_ids: FormControl<number[]>;
}

interface MeetingControls {
    name: FormControl<string>;
    date: FormControl<string>;
    notes: FormControl<string>;
}

export const newMeetingDataFormBuilder = {
    buildFormGroup: (): FormGroup<NewMeetingFormGroup> =>
        new FormGroup<NewMeetingFormGroup>({
            meeting: new FormGroup<MeetingControls>({
                name: new FormControl<string>("", {
                    nonNullable: true,
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(12),
                    ],
                }),
                date: new FormControl<string>(
                    formatDateFromInputForBackend(new Date()),
                    { nonNullable: true, validators: Validators.required }
                ),
                notes: new FormControl<string>("", {
                    nonNullable: true,
                    validators: Validators.required,
                }),
            }),
            user_ids: new FormControl<number[]>([], {
                nonNullable: true,
                validators: Validators.required,
            }),
        }),
};
