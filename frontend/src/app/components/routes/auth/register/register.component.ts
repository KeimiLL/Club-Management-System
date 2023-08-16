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
import { Router, RouterModule } from "@angular/router";
import { catchError, of } from "rxjs";

import { User } from "../../../../shared/models/user.model";
import { MaterialModule } from "../../../../shared/modules/material.module";
import { UserService } from "../../../../shared/services/user.service";
import { matchStringValidator } from "../../../../shared/utils/validators";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: UserService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
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
            this.userService
                .register({
                    email: this.registerForm.get("email")?.value,
                    password: this.registerForm.get("password")?.value,
                    full_name: `${this.registerForm.get("firstName")?.value} ${
                        this.registerForm.get("lastName")?.value
                    }`,
                })
                .pipe(catchError(() => of(null)))
                .subscribe((user: User | null) => {
                    if (user !== null) {
                        this.userService.currentUser = user;
                        this.router.navigate(["/auth/login"]);
                        // some info about a correct register
                    } else {
                        this.buildForm();
                        // dialog about an incorrect register
                    }
                });
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
