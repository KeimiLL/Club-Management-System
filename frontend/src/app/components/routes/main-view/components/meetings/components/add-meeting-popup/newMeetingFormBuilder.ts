import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Time } from "../../../../../../../shared/models/meetings.model";

export const newMeetingDataFormBuilder = {
    buildFormGroup: (): FormGroup =>
        new FormGroup({
            name: new FormControl<string>("", [Validators.required]),
            date: new FormControl<Date>(new Date(), [Validators.required]),
            time: new FormControl<Time>({ hours: 0, minutes: 0 }, [
                Validators.required,
            ]),
            attendees: new FormControl<number[]>([], [Validators.required]),
            notes: new FormControl<string>(""),
        }),
};
