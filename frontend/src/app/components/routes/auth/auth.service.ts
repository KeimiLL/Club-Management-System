import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of, tap } from "rxjs";

import { BackendResponse } from "../../../shared/models/misc.model";
import { User, UserCreate, UserLogin } from "../../../shared/models/user.model";
import { UserService } from "../../../shared/services/user.service";
import { DestoryClass } from "../../../shared/utils/destroyClass";
import {
    authFormBuilder,
    LoginFormGroup,
    RegisterFormGroup,
} from "./authFromBuilder";

@Injectable()
export class AuthService extends DestoryClass {
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
                tap((user: User | null) => {
                    if (user !== null) {
                        this.userService.currentUser = user;
                        this.router.navigate(["/app"]);
                    } else {
                        this.loginForm.markAllAsTouched();
                    }
                }),
                this.untilDestroyed()
            )
            .subscribe();
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
                tap((response: BackendResponse | null) => {
                    if (response !== null) {
                        this.router.navigate(["/auth/login"]);
                        // some info about a correct register, can be extracted from the response
                    } else {
                        this.registerForm =
                            authFormBuilder.buildRegisterFormGroup();
                        // dialog about an incorrect register
                    }
                }),
                this.untilDestroyed()
            )
            .subscribe();
    }
}
