import { FormControl, FormGroup, Validators } from "@angular/forms";

import { formatDateFromInputForBackend } from "../../../../../../../../../shared/utils/dateHelpers";

export interface NewCoachControls {
    date_of_joining: FormControl<string>;
    date_of_birth: FormControl<string>;
}

export const newCoachDataFormBuilder = {
    buildFormGroup: (): FormGroup<NewCoachControls> =>
        new FormGroup<NewCoachControls>({
            date_of_joining: new FormControl<string>(
                formatDateFromInputForBackend(new Date()),
                { nonNullable: true, validators: Validators.required }
            ),
            date_of_birth: new FormControl<string>(
                formatDateFromInputForBackend(new Date()),
                { nonNullable: true, validators: Validators.required }
            ),
        }),
};
