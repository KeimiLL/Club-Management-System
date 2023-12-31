import { FormControl, FormGroup, Validators } from "@angular/forms";

import { matchStringValidator } from "../../../shared/utils/validators";

export interface LoginFormGroup {
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface RegisterFormGroup {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}

export interface ResetPasswordFormGroup {
    oldPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
}

export const authFormBuilder = {
    buildLoginFormGroup: (): FormGroup<LoginFormGroup> =>
        new FormGroup<LoginFormGroup>({
            email: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl<string>("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
        }),

    buildRegisterFormGroup: (): FormGroup<RegisterFormGroup> => {
        const registerForm = new FormGroup<RegisterFormGroup>({
            firstName: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required],
            }),
            lastName: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required],
            }),
            email: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
            confirmPassword: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
        });

        registerForm.controls.confirmPassword.setValidators(
            matchStringValidator(registerForm.controls.password)
        );

        return registerForm;
    },
};

export const resetPasswordFormBuilder = {
    buildResetPasswordFormGroup: (): FormGroup<ResetPasswordFormGroup> => {
        const resetPasswordForm = new FormGroup<ResetPasswordFormGroup>({
            oldPassword: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
            newPassword: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
            confirmNewPassword: new FormControl("", {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(8)],
            }),
        });

        resetPasswordForm.controls.confirmNewPassword.setValidators(
            matchStringValidator(resetPasswordForm.controls.newPassword)
        );

        return resetPasswordForm;
    },
};
