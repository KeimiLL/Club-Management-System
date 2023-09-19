import { FormControl, FormGroup, Validators } from "@angular/forms";

export const newMeetingDataFormBuilder = {
    buildFormGroup: (): FormGroup =>
        new FormGroup({
            name: new FormControl<string>("", [Validators.required]),
            date: new FormControl<Date>(new Date(), [Validators.required]),
            user_ids: new FormControl<number[]>([], [Validators.required]),
            notes: new FormControl<string>(""),
        }),
};
