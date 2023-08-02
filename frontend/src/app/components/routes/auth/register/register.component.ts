import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
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
            { validator: this.passwordMatchValidator }
        );
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        } else {
            // Mark all fields as touched to trigger validation error messages
            Object.keys(this.registerForm.controls).forEach((controlName) => {
                this.registerForm.controls[controlName].markAsTouched();
            });
        }
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const passwordControl = formGroup.get("password");
        const confirmPasswordControl = formGroup.get("confirmPassword");

        if (passwordControl?.value !== confirmPasswordControl?.value) {
            confirmPasswordControl?.setErrors({ passwordMismatch: true });
        } else {
            confirmPasswordControl?.setErrors(null);
        }
    }
}
