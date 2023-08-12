import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchStringValidator(
    controlToMatch: AbstractControl | null
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (controlToMatch == null) {
            return null;
        }
        const valueToMatch = controlToMatch.value;
        const currentValue = control.value;

        if (valueToMatch !== currentValue) {
            return { matchString: true };
        }

        return null;
    };
}
