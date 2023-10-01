import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { catchError, of } from "rxjs";

import { User } from "../../../../shared/models/user.model";
import { MaterialModule } from "../../../../shared/modules/material.module";
import { UserService } from "../../../../shared/services/user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly userService: UserService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.userService
                .login(this.loginForm.value)
                .pipe(catchError(() => of(null)))
                .subscribe((user: User | null) => {
                    if (user !== null) {
                        this.userService.currentUser = user;
                        this.router.navigate(["/app"]);
                    } else {
                        Object.keys(this.loginForm.controls).forEach(
                            (controlName) => {
                                this.loginForm.controls[
                                    controlName
                                ].markAsTouched();
                            }
                        );
                        // dialog about an incorrect login
                    }
                });
        }
    }
}
