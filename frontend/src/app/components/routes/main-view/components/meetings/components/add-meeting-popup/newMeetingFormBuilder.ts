import { FormControl, FormGroup, Validators } from "@angular/forms";

export const newMeetingDataFormBuilder = {
    buildFormGroup: (): FormGroup =>
        new FormGroup({
            name: new FormControl<string>("", [Validators.required]),
            date: new FormControl<string>(new Date().toISOString(), [
                Validators.required,
            ]),
            attendees: new FormControl<number[]>([], [Validators.required]),
            notes: new FormControl<string>(""),
        }),
};
