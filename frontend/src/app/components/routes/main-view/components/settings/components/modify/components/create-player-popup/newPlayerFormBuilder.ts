import { FormControl, FormGroup, Validators } from "@angular/forms";

import { formatDateFromInputForBackend } from "../../../../../../../../../shared/utils/dateHelpers";

export interface NewPlayerControls {
    date_of_joining: FormControl<string>;
    date_of_birth: FormControl<string>;
    height: FormControl<number>;
    weight: FormControl<number>;
    team_id: FormControl<number | null>;
    notes: FormControl<string | null>;
}

export const newPlayerDataFormBuilder = {
    buildFormGroup: (): FormGroup<NewPlayerControls> =>
        new FormGroup<NewPlayerControls>({
            date_of_joining: new FormControl<string>(
                formatDateFromInputForBackend(new Date()),
                { nonNullable: true, validators: Validators.required }
            ),
            date_of_birth: new FormControl<string>(
                formatDateFromInputForBackend(new Date()),
                { nonNullable: true, validators: Validators.required }
            ),
            height: new FormControl<number>(0, {
                nonNullable: true,
                validators: Validators.required,
            }),
            weight: new FormControl<number>(0, {
                nonNullable: true,
                validators: Validators.required,
            }),
            team_id: new FormControl<null | number>(null, {
                nonNullable: false,
            }),
            notes: new FormControl<null | string>(null, { nonNullable: false }),
        }),
};
