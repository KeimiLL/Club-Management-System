import { FormControl, FormGroup, Validators } from "@angular/forms";

import { formatDateFromInputForBackend } from "../../../../../../../shared/utils/dateHelpers";

export interface MatchControls {
    match: FormGroup<BasicControls>;
    player_ids: FormControl<number[]>;
}

export interface BasicControls {
    opponent: FormControl<string>;
    notes: FormControl<string | null>;
    date: FormControl<string>;
    is_home: FormControl<boolean>;
}
export interface MatchDetails {
    notes: string;
    date: string;
}

export interface MatchScoreBase {
    opponent: string;
    is_home: boolean;
}
export const newMatchDataFormBuilder = {
    buildFormGroup: (): FormGroup<MatchControls> =>
        new FormGroup<MatchControls>({
            match: new FormGroup<BasicControls>({
                opponent: new FormControl<string>("", {
                    nonNullable: true,
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(20),
                    ],
                }),
                is_home: new FormControl<boolean>(false, {
                    nonNullable: true,
                }),
                date: new FormControl<string>(
                    formatDateFromInputForBackend(new Date()),
                    { nonNullable: true, validators: Validators.required }
                ),
                notes: new FormControl<string | null>(null, {
                    nonNullable: false,
                }),
            }),
            player_ids: new FormControl<number[]>([], {
                nonNullable: true,
                validators: [Validators.required],
            }),
        }),
};
