import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface TeamControls {
    team: FormGroup<BasicControls>;
    player_ids: FormControl<number[] | null>;
}

export interface BasicControls {
    name: FormControl<string>;
    coach_id: FormControl<number | null>;
}

export const newTeamDataFormBuilder = {
    buildFormGroup: (): FormGroup<TeamControls> =>
        new FormGroup<TeamControls>({
            team: new FormGroup<BasicControls>({
                name: new FormControl<string>("", {
                    nonNullable: true,
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(20),
                    ],
                }),
                coach_id: new FormControl<number | null>(null, {
                    nonNullable: false,
                }),
            }),
            player_ids: new FormControl<number[] | null>(null, {
                nonNullable: false,
            }),
        }),
};
