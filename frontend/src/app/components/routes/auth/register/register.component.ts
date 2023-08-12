import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { matchStringValidator } from "src/app/shared/utils/validators";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.registerForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
            confirmPassword: ["", [Validators.required]],
        });
        this.registerForm
            .get("confirmPassword")
            ?.setValidators(
                matchStringValidator(this.registerForm.get("password"))
            );
        this.registerForm.get("confirmPassword")?.updateValueAndValidity();
    }

    public onSubmit(): void {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        } else {
            Object.keys(this.registerForm.controls).forEach((controlName) => {
                this.registerForm.controls[controlName].markAsTouched();
            });
        }
    }

    public passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
        const passwordControl = control.get("password");
        const confirmPasswordControl = control.get("confirmPassword");

        if (passwordControl?.value !== confirmPasswordControl?.value) {
            confirmPasswordControl?.setErrors({ passwordMismatch: true });
        } else {
            confirmPasswordControl?.setErrors(null);
        }

        return null;
    };
}
