import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";

import { UserService } from "../../../shared/api/user.service";
import { BackendResponse } from "../../../shared/models/misc.model";
import { User, UserCreate, UserLogin } from "../../../shared/models/user.model";
import { DestroyClass } from "../../../shared/utils/destroyClass";
import {
    authFormBuilder,
    LoginFormGroup,
    RegisterFormGroup,
} from "./authFromBuilder";

@Injectable()
export class AuthService extends DestroyClass {
    public registerForm: FormGroup<RegisterFormGroup>;
    public loginForm: FormGroup<LoginFormGroup>;

    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {
        super();
    }

    public initLoginFormGroup(): void {
        this.loginForm = authFormBuilder.buildLoginFormGroup();
    }

    public initRegisterFormGroup(): void {
        this.registerForm = authFormBuilder.buildRegisterFormGroup();
    }

    public login(): void {
        const loginData: UserLogin = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value,
        };
        this.userService
            .login(loginData)
            .pipe(
                catchError(() => of(null)),
                this.untilDestroyed()
            )
            .subscribe((user: User | null) => {
                if (user !== null) {
                    this.userService.currentUser = user;
                    this.router.navigate(["/app"]);
                } else {
                    this.loginForm.markAllAsTouched();
                }
            });
    }

    public register(): void {
        const registerData: UserCreate = {
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value,
            full_name: `${this.registerForm.controls.firstName.value} ${this.registerForm.controls.lastName.value}`,
        };
        this.userService
            .register(registerData)
            .pipe(
                catchError(() => of(null)),
                this.untilDestroyed()
            )
            .subscribe((response: BackendResponse | null) => {
                if (response !== null) {
                    this.router.navigate(["/auth/login"]);
                } else {
                    this.registerForm.reset();
                    this.registerForm.markAllAsTouched();
                }
            });
    }
}
