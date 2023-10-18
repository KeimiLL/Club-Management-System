import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TeamCreate } from "../../../../../../../shared/models/team.model";

export interface TeamControls {
    team: FormGroup<BasicControls>;
    player_ids: FormControl<number[] | null>;
}

export interface BasicControls {
    name: FormControl<string>;
    coach_id: FormControl<number | null>;
}

export const newTeamDataFormBuilder = {
    buildFormGroup: (team: TeamCreate | null): FormGroup<TeamControls> =>
        new FormGroup<TeamControls>({
            team: new FormGroup<BasicControls>({
                name: new FormControl<string>(team?.team.name ?? "", {
                    nonNullable: true,
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(20),
                    ],
                }),
                coach_id: new FormControl<number | null>(
                    team?.team.coach_id ?? null,
                    {
                        nonNullable: false,
                    }
                ),
            }),
            player_ids: new FormControl<number[] | null>(
                team?.player_ids ?? null,
                {
                    nonNullable: false,
                }
            ),
        }),
};
