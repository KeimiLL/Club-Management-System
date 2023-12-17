import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MatchEventType } from "../../../../../../../../../../../shared/models/match-event.model";

export interface NewEventControls {
    is_own_event: FormControl<boolean>;
    minute: FormControl<number>;
    event_type: FormControl<MatchEventType>;
    description: FormControl<string>;
}

export const newEventFormBuilder = {
    buildFormGroup: (): FormGroup<NewEventControls> =>
        new FormGroup<NewEventControls>({
            is_own_event: new FormControl<boolean>(true, {
                nonNullable: true,
                validators: Validators.required,
            }),
            event_type: new FormControl<MatchEventType>(MatchEventType.Goal, {
                nonNullable: true,
                validators: Validators.required,
            }),
            description: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(30)],
            }),
            minute: new FormControl<number>(1, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.max(120),
                    Validators.min(1),
                ],
            }),
        }),
};
