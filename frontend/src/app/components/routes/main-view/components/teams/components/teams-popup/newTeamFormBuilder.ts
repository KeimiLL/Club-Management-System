import { FormControl, FormGroup, Validators } from "@angular/forms";

import { TeamCreate } from "../../../../../../../shared/models/team.model";

export interface TeamControls {
    name: FormControl<string>;
    coach_id: FormControl<number | null>;
}

export const newTeamDataFormBuilder = {
    buildFormGroup: (team: TeamCreate | null): FormGroup<TeamControls> =>
        new FormGroup<TeamControls>({
            name: new FormControl<string>(team?.name ?? "", {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20),
                ],
            }),
            coach_id: new FormControl<number | null>(team?.coach_id ?? null, {
                nonNullable: false,
            }),
        }),
};
