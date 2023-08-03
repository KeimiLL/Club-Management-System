import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    Validators,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    AbstractControl,
    ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/shared/modules/material.module";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(6)]],
                confirmPassword: ["", Validators.required],
            },
            { validators: this.passwordMatchValidator }
        );
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        } else {
            Object.keys(this.registerForm.controls).forEach((controlName) => {
                this.registerForm.controls[controlName].markAsTouched();
            });
        }
    }

    passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
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
